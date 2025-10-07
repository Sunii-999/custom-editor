"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { toast } from "sonner";
import { getUsers, getDocuments } from "./actions";
import { Id } from "../../../../convex/_generated/dataModel";

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

type User = {id: string; name: string; avatar: string; role?: string; color: string;
}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();
    const documentId = params.documentId as string; // Cache the document ID

    const [users, setUsers] = useState<User []>([]);

    // Log when the component mounts and the document ID
    useEffect(() => {
    }, [documentId]); // Added dependency on documentId for logging

    const fetchUsers = useMemo(
      () => async () => {
        try {
          const list = await getUsers();
          setUsers(list);
        } catch (e) {
          console.error("DEBUG ERROR: Failed to fetch users:", e);
          toast.error("Failed to fetch users");
        }
      },
      []
    );

    useEffect(() => {
      fetchUsers();
    }, [fetchUsers]);

    if (users.length === 0) {
      return <FullscreenLoader label="Loading room..." />;
    }


  return (
    <LiveblocksProvider 
      throttle={16}
      authEndpoint={ async () => {
        const endpoint = "/api/liveblocks-auth"
        const room = params.documentId as string;
        
        const response = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({room})
        })

        return await response.json()
      }}
      resolveUsers = {({userIds}) => {
        
        const resolvedUsers = userIds.map(
          (userId) => users.find((user) => user.id === userId) ?? undefined 
        )
        return resolvedUsers;
      }}
      resolveMentionSuggestions = {({text}) => {
        
        let filteredUsers = users;

        if (text){
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          )
        }

        return filteredUsers.map((user) => user.id)
      }}
      resolveRoomsInfo = {async ({roomIds}) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        
        return documents.map((document) => ({
          id: document.id,
          name: document.name
        }))
      }}
    >
      <RoomProvider 
      id={params.documentId as string} 
      initialStorage={{leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT}}
      >
        <ClientSideSuspense fallback={<FullscreenLoader label="Room loading..."/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}