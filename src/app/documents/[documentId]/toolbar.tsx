"use client";

import { useState } from "react";
import {
  LucideIcon,
  Undo2Icon,
  Redo2Icon,
  PrinterIcon,
  SpellCheckIcon,
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  ChevronDownIcon,
  HighlighterIcon,
  Link2Icon,
  ImageIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
  ListCollapseIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { type ColorResult, SketchPicker } from "react-color";
import { type Level } from "@tiptap/extension-heading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ==================== Reusable Toolbar Button ====================
interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({ onClick, isActive, icon: Icon }: ToolbarButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm transition-colors hover:bg-[#3c4043] text-gray-200",
      isActive && "bg-[#3c4043] text-white"
    )}
  >
    <Icon className="size-4" />
  </button>
);

// ==================== Font Family Button ====================
const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    "Arial", "Times New Roman", "Verdana", "Georgia", "Garamond",
    "Courier New", "Tahoma", "Trebuchet MS", "Impact",
    "Lucida Sans Unicode", "Lucida Sans", "Lucida Console",
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 w-[120px] flex items-center justify-between rounded-sm px-1.5 text-sm hover:bg-[#3c4043] text-gray-200",
            editor?.isActive("fontFamily") && "bg-[#3c4043] text-white"
          )}
        >
          <span className="truncate">{editor?.getAttributes("textStyle").fontFamily || "Arial"}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#202124] border border-[#3c4043] text-gray-200">
        {fonts.map((font) => (
          <button
            key={font}
            onClick={() => editor?.chain().focus().setFontFamily(font).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-[#3c4043]",
              editor?.getAttributes("textStyle").fontFamily === font && "bg-[#3c4043] text-white"
            )}
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ==================== Heading Level Button ====================
const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 4; level++) {
      if (editor?.isActive("heading", { level })) return `Heading ${level}`;
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 flex items-center justify-between rounded-sm px-1.5 text-sm hover:bg-[#3c4043] text-gray-200",
            editor?.isActive("heading") && "bg-[#3c4043] text-white"
          )}
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 bg-[#202124] border border-[#3c4043] text-gray-200">
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize }}
            onClick={() => value === 0 ? editor?.chain().focus().setParagraph().run() : editor?.chain().focus().toggleHeading({ level: value as Level }).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-[#3c4043]",
              (value === 0 && !editor?.isActive("heading")) || editor?.isActive("heading", { level: value }) ? "bg-[#3c4043] text-white" : ""
            )}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ==================== Font Size Button ====================
const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize?.replace("px", "") || "16";
  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={() => updateFontSize((parseInt(fontSize) - 1).toString())}
        className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-[#3c4043]"
      >
        <MinusIcon className="size-4 text-gray-200" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => updateFontSize(inputValue)}
          onKeyDown={(e) => e.key === "Enter" && updateFontSize(inputValue)}
          className="h-7 w-10 text-sm text-center border border-neutral-500 rounded-sm bg-[#202124] text-gray-200 focus:outline-none"
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="h-7 w-10 text-sm text-center border border-neutral-500 rounded-sm hover:bg-[#3c4043] text-gray-200"
        >
          {currentFontSize}
        </button>
      )}
      <button
        onClick={() => updateFontSize((parseInt(fontSize) + 1).toString())}
        className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-[#3c4043]"
      >
        <PlusIcon className="size-4 text-gray-200" />
      </button>
    </div>
  );
};

// ==================== Text & Highlight Color Buttons ====================
const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#ffffff";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-[#3c4043]">
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 bg-[#202124] border border-[#3c4043]">
        <SketchPicker color={value} onChange={(clr) => editor?.chain().focus().setColor(clr.hex).run()} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#ffffff";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 flex flex-col items-center justify-center rounded-sm hover:bg-[#3c4043]">
          <HighlighterIcon className="size-4 text-gray-200" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0 bg-[#202124] border border-[#3c4043]">
        <SketchPicker color={value} onChange={(clr) => editor?.chain().focus().setHighlight({ color: clr.hex }).run()} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ==================== Link Button ====================
const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const applyLink = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu onOpenChange={(open) => open && setValue(editor?.getAttributes("link").href || "")}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-[#3c4043]">
          <Link2Icon className="size-4 text-gray-200" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2 bg-[#202124] border border-[#3c4043] text-gray-200">
        <Input placeholder="https://..." value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => applyLink(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ==================== Image Button ====================
const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [url, setUrl] = useState("");

  const insertImage = () => {
    editor?.chain().focus().setImage({ src: url }).run();
    setIsDialogOpen(false);
    setUrl("");
  };

  return (
    <>
      <button onClick={() => setIsDialogOpen(true)} className="h-7 w-7 flex items-center justify-center rounded-sm hover:bg-[#3c4043]">
        <ImageIcon className="size-4 text-gray-200" />
      </button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#202124] border border-[#3c4043] text-gray-200">
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input placeholder="https://..." value={url} onChange={(e) => setUrl(e.target.value)} />
          <DialogFooter>
            <Button onClick={insertImage}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// ==================== Alignment Buttons ====================
const AlignmentButtons = () => {
  const { editor } = useEditorStore();
  return (
    <>
      <ToolbarButton icon={AlignLeftIcon} onClick={() => editor.chain().focus().setTextAlign("left").run()} isActive={editor.isActive({ textAlign: "left" })} />
      <ToolbarButton icon={AlignCenterIcon} onClick={() => editor.chain().focus().setTextAlign("center").run()} isActive={editor.isActive({ textAlign: "center" })} />
      <ToolbarButton icon={AlignRightIcon} onClick={() => editor.chain().focus().setTextAlign("right").run()} isActive={editor.isActive({ textAlign: "right" })} />
      <ToolbarButton icon={AlignJustifyIcon} onClick={() => editor.chain().focus().setTextAlign("justify").run()} isActive={editor.isActive({ textAlign: "justify" })} />
    </>
  );
};

// ==================== List Buttons ====================
const ListButtons = () => {
  const { editor } = useEditorStore();
  return (
    <>
      <ToolbarButton icon={ListIcon} onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive("bulletList")} />
      <ToolbarButton icon={ListOrderedIcon} onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive("orderedList")} />
      <ToolbarButton icon={ListCollapseIcon} onClick={() => editor.chain().focus().liftListItem("listItem").run()} />
    </>
  );
};

// ==================== Full Toolbar ====================
export const Toolbar = () => {
  const { editor } = useEditorStore();

  if (!editor) return null;

  return (
    <div className="bg-[#303134] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto border border-[#3c4043]">
      {/* Left group: Undo/Redo/Print/Spellcheck */}
      <ToolbarButton icon={Undo2Icon} onClick={() => editor.chain().focus().undo().run()} />
      <ToolbarButton icon={Redo2Icon} onClick={() => editor.chain().focus().redo().run()} />
      <ToolbarButton icon={PrinterIcon} onClick={() => window.print()} />
      <ToolbarButton icon={SpellCheckIcon} onClick={() => {
        const current = editor.view.dom.getAttribute("spellcheck");
        editor.view.dom.setAttribute("spellcheck", current === "false" ? "true" : "false");
      }} />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />

      {/* Font family / heading / font size */}
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />

      {/* Formatting: Bold/Italic/Underline */}
      <ToolbarButton icon={BoldIcon} onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive("bold")} />
      <ToolbarButton icon={ItalicIcon} onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive("italic")} />
      <ToolbarButton icon={UnderlineIcon} onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive("underline")} />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />

      {/* Colors */}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />

      {/* Links / Images */}
      <LinkButton />
      <ImageButton />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />

      {/* Alignment */}
      <AlignmentButtons />
      <Separator orientation="vertical" className="h-6 bg-[#5f6368]" />

      {/* Lists */}
      <ListButtons />
    </div>
  );
};
