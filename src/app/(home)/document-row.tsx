"use client"

import {
    TableCell, TableRow
} from "@/components/ui/table"

import { SiGoogledocs } from "react-icons/si"
import { Doc } from "../../../convex/_generated/dataModel"

import { Building2Icon, CircleUserIcon } from "lucide-react";

import { format } from "date-fns"
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";

interface DocumentRowProps {
    document: Doc<"documents">;
    isOwner: boolean;
}

export const DocumentRow =({document}: DocumentRowProps) => {

    const router = useRouter();
    return (
        <TableRow
            // 1. Modern Hover State: subtle color change and a slight glow/shadow effect on hover
            onClick={() => router.push(`/documents/${document._id}`)}
            className="cursor-pointer group hover:bg-gray-50/50 dark:hover:bg-[#2c3032] transition-colors duration-150 relative"
        >
            
            {/* 1. Document Icon */}
            <TableCell className="w-[40px] p-2 pl-4">
                <SiGoogledocs 
                    // Using a Google Docs blue color for the icon, making it a focal point
                    className="size-5 fill-grey-500/80" 
                />
            </TableCell>
            
            <TableCell className="font-semibold text-gray-600 dark:text-gray-60 md:w-[45%] py-3">
                {document.title}
            </TableCell>
            
            <TableCell 
                className="text-sm text-muted-foreground hidden md:table-cell py-3 w-[150px] whitespace-nowrap"
            >
                <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    {/* Using slightly smaller, unified icons */}
                    {document.organizationId ? <Building2Icon className="size-4 text-amber-500" /> : <CircleUserIcon className="size-4 text-emerald-500" /> }
                    <span className="truncate">
                        {document.organizationId ? "Organization" : "Personal"}
                    </span>
                </span>
            </TableCell>
            
            {/* 4. Date Created */}
            <TableCell 
                className="text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell py-3 w-[150px] whitespace-nowrap"
            >
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
            </TableCell>
            
            {/* 5. Menu/Actions */}
            <TableCell className="w-[60px] pr-4 py-3">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <DocumentMenu
                        documentId={document._id}
                        title={document.title}
                        onNewTab={() => window.open(`/documents/${document._id}`, "_blank")}
                    />
                </div>
            </TableCell>
        </TableRow>
    )
}