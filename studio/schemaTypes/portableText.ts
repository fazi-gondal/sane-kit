import { DocumentTextIcon } from "@sanity/icons";
import { defineType, defineArrayMember, defineField } from "sanity";
import { fields, documents, descriptions, validation, sanityOptions } from "../dictionary";
import { studioConfig } from "../config";
import {
  SuperscriptDecorator,
  SubscriptDecorator,
  HighlightDecorator,
  SuperscriptIcon,
  SubscriptIcon,
  HighlightIcon,
  TextColorIcon,
} from "../components/portableText";

const isPortuguese = studioConfig.language === "pt-BR";

// Helper to add custom components to specific decorators
const enhancedDecorators = sanityOptions.textDecorators.map((decorator) => {
  switch (decorator.value) {
    case "sup":
      return { ...decorator, component: SuperscriptDecorator, icon: SuperscriptIcon };
    case "sub":
      return { ...decorator, component: SubscriptDecorator, icon: SubscriptIcon };
    case "highlight":
      return { ...decorator, component: HighlightDecorator, icon: HighlightIcon };
    default:
      return decorator;
  }
});

export const portableText = defineType({
  name: "portableText",
  title: documents.portableText,
  type: "array",
  icon: DocumentTextIcon,
  of: [
    defineArrayMember({
      type: "block",
      title: descriptions.defaultBlock,
      styles: sanityOptions.blockStyles,
      lists: sanityOptions.listStyles,
      marks: {
        decorators: enhancedDecorators,
        annotations: [
          {
            name: "link",
            type: "object",
            title: descriptions.defaultLink,
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: fields.href,
                validation: (rule) => 
                  rule.required().error(validation.linkUrlRequired)
                  .uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"]
                  }).error(validation.linkUrlInvalid),
              }),
              defineField({
                name: "blank",
                title: fields.blank,
                type: "string",
                options: {
                  list: sanityOptions.yesNo,
                  layout: "radio",
                },
                initialValue: "true",
              }),
            ],
          },
          // Text color annotation for colored text spans
          {
            name: "textColor",
            type: "object",
            title: isPortuguese ? "Cor do Texto" : "Text Color",
            icon: TextColorIcon,
            fields: [
              defineField({
                name: "color",
                type: "string",
                title: isPortuguese ? "Cor" : "Color",
                options: {
                  list: sanityOptions.textColorOptions,
                  layout: "dropdown",
                },
                initialValue: "blue",
              }),
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "codeBlock",
      title: descriptions.defaultCodeBlock,
    }),
    defineArrayMember({
      type: "calloutBlock",
      title: isPortuguese ? "Bloco de Destaque" : "Callout Block",
    }),
    defineArrayMember({
      type: "image",
      title: descriptions.defaultImage,
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: fields.alt,
          validation: (rule) => 
            rule.required().error(validation.imageAltRequired),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: fields.caption,
        }),
      ],
    }),
  ],
});
