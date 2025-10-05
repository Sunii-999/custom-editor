"use client"

import Image from "next/image"
import Link from "next/link"
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"

import { DocumentInput } from "./document-input"

import { 
    BoldIcon,
    FileIcon, 
    FileJsonIcon, 
    FilePenIcon, 
    FilePlusIcon, 
    FileTextIcon, 
    GlobeIcon, 
    ItalicIcon, 
    PrinterIcon, 
    Redo2Icon, 
    RemoveFormattingIcon, 
    StrikethroughIcon, 
    TextIcon, 
    TrashIcon, 
    UnderlineIcon, 
    Undo2Icon 
} from "lucide-react"

import { BsFilePdf } from "react-icons/bs"
import { useEditorStore } from "@/store/use-editor-store"

export const Navbar = () => {
    const { editor } = useEditorStore();

    const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
        editor?.chain().focus().insertTable({ rows, cols, withHeaderRow: false }).run();
    };

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    };

    const onSaveHTML = () => {
        if (!editor) return;
        const content = editor.getHTML();
        const blob = new Blob([content], { type: "text/html" });
        onDownload(blob, "document.html");
    };

    const onSaveJSON = () => {
        if (!editor) return;
        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
        onDownload(blob, "document.json");
    };

    const onSaveText = () => {
        if (!editor) return;
        const content = editor.getText();
        const blob = new Blob([content], { type: "text/plain" });
        onDownload(blob, "document.txt");
    };

    return (
        <nav className="flex items-center justify-between px-4 py-2 bg-[#202124] border-b border-[#3c4043]">
            <div className="flex gap-3 items-center"> 
                <Link href="/">
                    <Image src="/logo.svg" alt="logo" width={36} height={36} className="invert" />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput />
                    <div className="flex">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0 text-gray-300">
                            {/* File Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-medium px-2 py-1 rounded hover:bg-[#303134] transition">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="bg-[#303134] text-gray-200 border border-[#3c4043] shadow-lg rounded-md min-w-[180px]">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className="size-4 mr-2" />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent className="bg-[#303134] border border-[#3c4043] rounded-md">
                                            <MenubarItem onClick={onSaveJSON}>
                                                <FileJsonIcon className="size-4 mr-2"/>
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveHTML}>
                                                <GlobeIcon className="size-4 mr-2"/>
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf className="size-4 mr-2"/>
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveText}>
                                                <FileTextIcon className="size-4 mr-2"/>
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem>
                                        <FilePlusIcon className="size-4 mr-2"/>
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator className="bg-[#3c4043]" />
                                    <MenubarItem>
                                        <FilePenIcon className="size-4 mr-2"/>
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem>
                                        <TrashIcon className="size-4 mr-2"/>
                                        Remove
                                    </MenubarItem>
                                    <MenubarSeparator className="bg-[#3c4043]" />
                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className="size-4 mr-2"/>
                                        Print <MenubarShortcut>⌘P / CTRL + P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                            {/* Edit Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-medium px-2 py-1 rounded hover:bg-[#303134] transition">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent className="bg-[#303134] text-gray-200 border border-[#3c4043] shadow-lg rounded-md min-w-[160px]">
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon className="size-4 mr-2"/>
                                        Undo <MenubarShortcut>⌘Z / CTRL + Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon className="size-4 mr-2"/>
                                        Redo <MenubarShortcut>⌘Y / CTRL + Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>

                            {/* Insert Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-medium px-2 py-1 rounded hover:bg-[#303134] transition">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent className="bg-[#303134] text-gray-200 border border-[#3c4043] shadow-lg rounded-md min-w-[140px]">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            Table
                                        </MenubarSubTrigger>
                                        <MenubarSubContent className="bg-[#303134] border border-[#3c4043] rounded-md">
                                            <MenubarItem onClick={() => insertTable({rows: 1, cols: 1})}>1 x 1</MenubarItem>
                                            <MenubarItem onClick={() => insertTable({rows: 2, cols: 2})}>2 x 2</MenubarItem>
                                            <MenubarItem onClick={() => insertTable({rows: 3, cols: 3})}>3 x 3</MenubarItem>
                                            <MenubarItem onClick={() => insertTable({rows: 4, cols: 4})}>4 x 4</MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>

                            {/* Format Menu */}
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-medium px-2 py-1 rounded hover:bg-[#303134] transition">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent className="bg-[#303134] text-gray-200 border border-[#3c4043] shadow-lg rounded-md min-w-[180px]">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon className="size-4 mr-2"/>
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent className="bg-[#303134] border border-[#3c4043] rounded-md">
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon className="size-4 mr-2"/>
                                                Bold <MenubarShortcut>⌘B / CTRL + B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon className="size-4 mr-2"/>
                                                Italic <MenubarShortcut>⌘I / CTRL + I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon className="size-4 mr-2"/>
                                                Underline <MenubarShortcut>⌘U / CTRL + U</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon className="size-4 mr-2"/>
                                                Strikethrough <MenubarShortcut>⌘S / CTRL + S</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon className="size-4 mr-2"/>
                                        Clear Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center">
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    );
};
