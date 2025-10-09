"use client"

import { useEditor, EditorContent} from "@tiptap/react"
import { useRef, useEffect } from "react" // ⬅️ ADDED useState, useRef, useEffect
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import TaskItem from "@tiptap/extension-task-item"
import Table from "@tiptap/extension-table"
import { Color } from "@tiptap/extension-color"
import Highlight from "@tiptap/extension-highlight"
import TaskList from "@tiptap/extension-task-list"
import Link from "@tiptap/extension-link"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import Image from "@tiptap/extension-image"
import ImageResize from "tiptap-extension-resize-image"
import Underline from "@tiptap/extension-underline"
import FontFamily from "@tiptap/extension-font-family"
import TextStyle from "@tiptap/extension-text-style"

import { FontSizeExtension } from "@/extensions/font-size"
import { LineHeightExtension } from "@/extensions/line-height"

import { useLiveblocksExtension } from "@liveblocks/react-tiptap";

import { Ruler } from "./ruler"


import { useEditorStore } from "@/store/use-editor-store"
import { Threads } from "./threads"

import { useStorage } from "@liveblocks/react"

import { RIGHT_MARGIN_DEFAULT, LEFT_MARGIN_DEFAULT } from "@/constants/margins";


// Define a unique class name for the reader mode styles
const READER_MODE_CLASS = 'bg-amber-50 dark:bg-stone-800 text-gray-900 dark:text-gray-100 shadow-xl';

interface EditorProps {
    initialContent?: string | undefined
    onToggleReaderMode: () => void;
    isReaderModeActive: boolean;
}
 
export const Editor = ({initialContent, isReaderModeActive}: EditorProps) => {
    const leftMargin = useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT
    const rightMargin = useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT
    
    // ⬅️ REF: Reference to the inner container div that wraps EditorContent
    const contentContainerRef = useRef<HTMLDivElement | null>(null);

    const liveblocks = useLiveblocksExtension({
        initialContent,
        offlineSupport_experimental: true,
    });
    const { setEditor } = useEditorStore()

    const editor = useEditor ({
        immediatelyRender: false,
        onCreate({editor}) {
            setEditor(editor)
        },
        onDestroy(){
            setEditor(null)
        },
        onUpdate({editor}){
            setEditor(editor)
        },
        onSelectionUpdate({editor}){
            setEditor(editor)
        },
        onTransaction({editor}){
            setEditor(editor)
        },
        onFocus({editor}){
            setEditor(editor)
        },
        onBlur({editor}){
            setEditor(editor)
        },
        onContentError({editor}){
            setEditor(editor)
        },
        // The default styles for the actual Prosemirror content area
        editorProps: {
            attributes: {
                style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
                // Keep the default light mode styles here. They will be removed/added in useEffect.
                class: "focus:outline-none print:border-0 bg-white border-[#C7C7C7] border flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text"
            },
        },
        extensions: [
            StarterKit.configure({
                history: false,
            }),
            liveblocks,
            LineHeightExtension,
            FontSizeExtension,
            TextAlign.configure({
                types: ["heading", "paragraph"]
            }),
            Link.configure({
                openOnClick: true,
                autolink: true,
                    defaultProtocol: "https"
            }),
            Color,
            Highlight.configure({
                multicolor: true,
            }),
            TextStyle,
            FontFamily,
            Underline,
            Table.configure({
                resizable: true,
            }),
            TableHeader,
            TableRow,
            TableCell,
            TaskItem.configure({
                nested:true,
            }),
            TaskList,
            Image,
            ImageResize,
        ],
    })

    // ⬅️ EFFECT: This handles applying/removing the reader mode classes
    useEffect(() => {
        const element = contentContainerRef.current;
        if (element && editor?.view.dom) {
            // Get the classes to apply/remove
            const classes = READER_MODE_CLASS.split(' '); 
            // Get the classes that define the default "paper" look inside the editorProps
            const defaultEditorClasses = ['bg-white', 'border', 'border-[#C7C7C7]'];

            if (isReaderModeActive) {
                // 1. Add reader mode classes to the outer container
                element.classList.add(...classes);
                
                // 2. Remove default background/border from the Tiptap content view
                editor.view.dom.classList.remove(...defaultEditorClasses);
                editor.view.dom.classList.add('bg-transparent'); 
            } else {
                // 1. Remove reader mode classes from the outer container
                element.classList.remove(...classes);
                
                // 2. Restore default background/border to the Tiptap content view
                editor.view.dom.classList.remove('bg-transparent');
                editor.view.dom.classList.add(...defaultEditorClasses); 
            }
        }
    }, [isReaderModeActive, editor]);


    return (
        <div className="size-full overflow-x-auto bg-[#333435] px-4 print:p-0 print:bg-white print:overflow-visible">
            <Ruler />
            <div 
                ref={contentContainerRef} // ⬅️ Ref applied here
                className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0 transition-colors duration-300" // Added transition for smooth effect
            >
                <EditorContent editor={editor} />
                <Threads editor={editor} />
            </div>
        </div>
    );
};