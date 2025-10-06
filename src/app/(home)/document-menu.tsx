"use client"

import { Button } from "@/components/ui/button"
import { ExternalLinkIcon, FilePenIcon, MoreHorizontal, TrashIcon } from "lucide-react"
import { Id } from "../../../convex/_generated/dataModel"

import {
 DropdownMenu,
 DropdownMenuItem,
 DropdownMenuTrigger,
 DropdownMenuContent,
 DropdownMenuSeparator // Added for a clean visual break
} from "@/components/ui/dropdown-menu"
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

interface DocumentMenuProps {
    documentId: Id<"documents">;
    title: string;
    onNewTab: (id: Id<"documents">) => void;
}

export const DocumentMenu = ({documentId, title, onNewTab}: DocumentMenuProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {/* Modern Trigger Style: 
                    1. Use `MoreVertical` for a cleaner look than `MoreHorizontal`.
                    2. Use a subtle hover effect (bg-gray-700/50)
                */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-8 w-8 
                               text-gray-500 dark:text-gray-400 
                               hover:bg-gray-200 dark:hover:bg-[#3c4043] 
                               transition-colors"
                >
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent 
                className="w-48 bg-[#2f3032] border border-gray-700 text-gray-200 shadow-xl rounded-lg"
            >
                
                <RenameDialog documentId={documentId} initialTitle={title}>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()} 
                        onClick={(e) => e.stopPropagation()} 
                        className="cursor-pointer hover:bg-gray-700/70 data-[highlighted]:bg-gray-700/70"
                    >
                        <FilePenIcon  className="size-4 mr-2 text-blue-400"/>
                        Rename
                    </DropdownMenuItem>
                </RenameDialog>
                
                {/* 2. Open in New Tab Option */}
                <DropdownMenuItem
                    onClick={() => onNewTab(documentId)}
                    className="cursor-pointer hover:bg-gray-700/70 data-[highlighted]:bg-gray-700/70"
                >
                    <ExternalLinkIcon  className="size-4 mr-2 text-emerald-400"/>
                    Open in new tab
                </DropdownMenuItem>
                
                {/* Clean Separator for destructive action */}
                <DropdownMenuSeparator className="bg-gray-600/50 my-1"/>

                {/* 3. Delete Option (Destructive) */}
                <RemoveDialog documentId={documentId}>
                    <DropdownMenuItem
                        onSelect={(e) => e.preventDefault()}
                        onClick={(e) => e.stopPropagation()}
                        // Highlight with a red text/icon for a destructive action
                        className="cursor-pointer text-red-400 hover:bg-gray-700/70 data-[highlighted]:bg-gray-700/70 focus:text-red-400"
                    >
                        <TrashIcon  className="size-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </RemoveDialog>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}