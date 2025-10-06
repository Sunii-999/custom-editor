"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"

import { toast } from "sonner";

import { Id } from "../../convex/_generated/dataModel"
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

interface RemoveDialogProp{
    documentId: Id<'documents'>;
    children: React.ReactNode;
}

export const RemoveDialog = ({documentId, children}: RemoveDialogProp) => {

    const handleDelete = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);

    const router = useRouter();

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will vaporize your document.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isRemoving}
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRemoving(true);
                            handleDelete({ id:documentId })
                                .catch(() => toast.error("Something went wrong"))
                                .then(() => {
                                    toast.success("Document removed successfully")
                                    router.push("/")
                                })
                                .finally(() => {
                                    setIsRemoving(false);
                                });
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}