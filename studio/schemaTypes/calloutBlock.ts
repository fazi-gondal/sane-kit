import { defineType, defineField } from "sanity";
import { studioConfig } from "../config";
import { sanityOptions } from "../dictionary";
import { CalloutIcon } from "../components/portableText";

const isPortuguese = studioConfig.language === "pt-BR";

/**
 * Callout block schema for rich text content.
 * Provides styled alert/note boxes for tips, warnings, notes, and danger messages.
 */
export const calloutBlock = defineType({
  name: "calloutBlock",
  title: isPortuguese ? "Bloco de Destaque" : "Callout Block",
  type: "object",
  icon: CalloutIcon,
  fields: [
    defineField({
      name: "type",
      title: isPortuguese ? "Tipo" : "Type",
      type: "string",
      options: {
        list: sanityOptions.calloutTypes,
        layout: "dropdown",
      },
      initialValue: "note",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: isPortuguese ? "Título (opcional)" : "Title (optional)",
      type: "string",
      description: isPortuguese 
        ? "Título opcional para o bloco de destaque" 
        : "Optional title for the callout block",
    }),
    defineField({
      name: "content",
      title: isPortuguese ? "Conteúdo" : "Content",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      type: "type",
      title: "title",
      content: "content",
    },
    prepare({ type, title, content }) {
      const typeLabels: Record<string, string> = {
        note: isPortuguese ? "Nota" : "Note",
        tip: isPortuguese ? "Dica" : "Tip",
        warning: isPortuguese ? "Aviso" : "Warning",
        danger: isPortuguese ? "Perigo" : "Danger",
        info: isPortuguese ? "Info" : "Info",
      };
      
      return {
        title: title || typeLabels[type || "note"] || "Callout",
        subtitle: content?.slice(0, 60) + (content && content.length > 60 ? "..." : ""),
        media: CalloutIcon,
      };
    },
  },
});
