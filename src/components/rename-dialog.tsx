/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import { toast } from "sonner";


import { Id } from "../../convex/_generated/dataModel"
import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface RenameDialogProp{
    documentId: Id<'documents'>;
    initialTitle: string;
    children: React.ReactNode;
}

export const RenameDialog = ({documentId, initialTitle, children}: RenameDialogProp) => {

    const handleUpdate = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen]= useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);
      
        try {
          await handleUpdate({ id: documentId, title: title.trim() || "Untitled" });
          toast.success("Document renamed successfully");
        } catch (err) {
          toast.error("Something went wrong");
        } finally {
          setIsUpdating(false);
          setOpen(false);
        }
      }
      

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>
                            Rename
                        </DialogTitle>
                        <DialogDescription>
                            Enter the new name you would like.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document Name"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation();
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="ghost"
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            Rename
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}