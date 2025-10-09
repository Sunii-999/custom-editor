"use client"

import { useState, useCallback } from "react"; // ⬅️ IMPORT useState and useCallback
import { Preloaded, usePreloadedQuery } from "convex/react";

import {Editor} from "./editor"
import {Toolbar, ToolbarProps} from "./toolbar" // ⬅️ IMPORT ToolbarProps for typing
import {Navbar} from "./navbar"
import { Room } from "./room";
import { api } from "../../../../convex/_generated/api";


interface DocumentProps {
    preloadedDocument: Preloaded<typeof api.documents.getById>
}

export const Document = ({preloadedDocument}: DocumentProps) => {

    const document = usePreloadedQuery(preloadedDocument)
    
    // 1. STATE for reader mode
    const [isReaderModeActive, setIsReaderModeActive] = useState(false);

    // 2. TOGGLE function
    const toggleReaderMode = useCallback(() => {
        setIsReaderModeActive(prev => !prev);
    }, []);

    // 3. Define props for Toolbar and Editor
    const readerModeProps: Pick<ToolbarProps, 'onToggleReaderMode' | 'isReaderModeActive'> = {
        onToggleReaderMode: toggleReaderMode,
        isReaderModeActive: isReaderModeActive,
    }

    return ( 
        <Room>
            <div className="min-h-screen bg-[#202124]">
                <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#202124] print:hidden">
                    <Navbar data={document} />
                    
                    {/* ⬅️ PASS PROPS to Toolbar */}
                    <Toolbar {...readerModeProps} /> 
                </div>
                <div className="pt-[140px] print:pt-0 ">
                    {/* ⬅️ PASS PROPS to Editor */}
                    <Editor 
                        initialContent={document.initialContent}
                        {...readerModeProps}
                    />
                </div>
            </div> 
        </Room>
    );
}