import { Extension, type CommandProps } from "@tiptap/core"

export const LineHeightExtension = Extension.create({
  name: "lineHeight",

  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultLineHeight: "normal",
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            renderHTML: attributes => {
              if (!attributes.lineHeight) return {}
              return { style: `line-height: ${attributes.lineHeight}` }
            },
            parseHTML: element => element.style.lineHeight || this.options.defaultLineHeight,
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ commands }: CommandProps) => {
          return this.options.types.every(type =>
            commands.updateAttributes(type, { lineHeight }),
          )
        },

      unsetLineHeight:
        () =>
        ({ commands }: CommandProps) => {
          return this.options.types.every(type =>
            commands.updateAttributes(type, { lineHeight: this.options.defaultLineHeight }),
          )
        },
    }
  },
})
