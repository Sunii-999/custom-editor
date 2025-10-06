"use server"

import { ConvexHttpClient } from "convex/browser";
import {auth, clerkClient} from "@clerk/nextjs/server"
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getDocuments(ids: Id<"documents">[]) {
    return await convex.query(api.documents.getByIds, {ids})
}

export async function getUsers(){
    
    const { sessionClaims } = await auth();

    // --- LOGIC BLOCK 1: CLERK SESSION CLAIMS ---
    if (!sessionClaims) {
        console.error("DEBUG SERVER ACTION FAILURE: No session claims found.");
        // If claims are missing, we can't get the org ID, so return an empty list or throw an error
        return [];
    }

    // Determine the organization ID, checking for the nested 'o.id' based on previous debugging
    const userOrgId = sessionClaims?.org_id || sessionClaims?.o?.id;

    if (!userOrgId) {
        console.error("DEBUG SERVER ACTION FAILURE: No valid organization ID found in session claims.");
        return [];
    }

    const clerk = await clerkClient();

    try {
        // --- LOGIC BLOCK 2: CALLING CLERK API ---        
        const response = await clerk.users.getUserList({
            organizationId: [userOrgId],
        });

        const users = response.data.map((user) => ({
            id: user.id,
            name: user.fullName ?? "Anonymous",
            avatar: user.imageUrl,
        }));
                
        return users
        
    } catch (e) {
        console.error("DEBUG SERVER ACTION CRITICAL ERROR: Failed to fetch users from Clerk.", e);
        // Throw or return empty array if the Clerk API call fails
        return [];
    }
}