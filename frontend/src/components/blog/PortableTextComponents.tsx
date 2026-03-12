import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/client";
import type { CodeBlock as SanityCodeBlock, Code as SanityCode, SanityImageHotspot, SanityImageCrop } from "@/sanity/types";
import { CodeBlock } from "./CodeBlock";
import { AlertCircle, Info, Lightbulb, AlertTriangle, XCircle } from "lucide-react";

// Local type definition for CalloutBlock (will be auto-generated after running sanity typegen)
interface SanityCalloutBlock {
	_type: "calloutBlock";
	type?: "note" | "tip" | "warning" | "danger" | "info";
	title?: string;
	content?: string;
}

// Callout component for rendering alert/note blocks
const CalloutBlock = ({ value }: { value: SanityCalloutBlock }) => {
	if (!value) return null;

	const typeConfig: Record<string, { icon: React.ReactNode; className: string }> = {
		note: {
			icon: <Info className="h-5 w-5" />,
			className: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950/30 dark:border-blue-800 dark:text-blue-200",
		},
		tip: {
			icon: <Lightbulb className="h-5 w-5" />,
			className: "bg-green-50 border-green-200 text-green-800 dark:bg-green-950/30 dark:border-green-800 dark:text-green-200",
		},
		warning: {
			icon: <AlertTriangle className="h-5 w-5" />,
			className: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950/30 dark:border-yellow-800 dark:text-yellow-200",
		},
		danger: {
			icon: <XCircle className="h-5 w-5" />,
			className: "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/30 dark:border-red-800 dark:text-red-200",
		},
		info: {
			icon: <AlertCircle className="h-5 w-5" />,
			className: "bg-slate-50 border-slate-200 text-slate-800 dark:bg-slate-950/30 dark:border-slate-800 dark:text-slate-200",
		},
	};

	const config = typeConfig[value.type || "note"] || typeConfig.note;

	return (
		<div className={`my-6 rounded-lg border p-4 ${config.className}`}>
			<div className="flex gap-3">
				<span className="flex-shrink-0 mt-0.5">{config.icon}</span>
				<div className="flex-1">
					{value.title && (
						<p className="font-semibold mb-1">{value.title}</p>
					)}
					<p className="leading-relaxed">{value.content}</p>
				</div>
			</div>
		</div>
	);
};

// Text color styles mapping
const textColorStyles: Record<string, string> = {
	red: "text-red-600 dark:text-red-400",
	blue: "text-blue-600 dark:text-blue-400",
	green: "text-green-600 dark:text-green-400",
	yellow: "text-yellow-600 dark:text-yellow-400",
	purple: "text-purple-600 dark:text-purple-400",
	muted: "text-muted-foreground",
};

// Basic components, customize as needed
export const portableTextComponents: PortableTextComponents = {
	types: {
		image: ({ value }: { value: { 
			asset?: { _ref: string; _type: string };
			hotspot?: SanityImageHotspot;
			crop?: SanityImageCrop;
			alt?: string;
			caption?: string;
			_type: string;
		} }) => {
			if (!value?.asset?._ref) {
				return null;
			}
			return (
				<figure className="relative my-6">
					<div className="aspect-video overflow-hidden rounded-lg">
						<Image
							src={urlFor(value.asset._ref).url()}
							alt={value.alt || ""} // Provide fallback alt
							fill
							className="object-cover"
						/>
					</div>
					{value.caption && (
						<figcaption className="mt-2 text-center text-sm text-muted-foreground">
							{value.caption}
						</figcaption>
					)}
				</figure>
			);
		},
		// Fixed codeBlock component with proper property passing
		codeBlock: ({ value }: { value: SanityCodeBlock }) => {
			// With additional defensive null checks
			if (!value) {
				return null;
			}

			// Handle direct string code (legacy format)
			if (typeof value.code === "string") {
				return (
					<CodeBlock
						code={value.code}
						title={value.title || ""}
						language={"typescript"} // Default to typescript
						showLineNumbers={value.showLineNumbers === "true"}
						highlightLines={value.highlightLines}
						caption={value.caption}
					/>
				);
			}

			// Handle new code input format ({_type: 'code', code: '...', language: '...'})
			if (typeof value.code === "object" && value.code !== null) {
				// Extract simple string from the code object
				const codeText = (value.code as SanityCode).code || "";
				const language = (value.code as SanityCode).language || "typescript";
				const filename = (value.code as SanityCode).filename || "";

				return (
					<CodeBlock
						code={codeText}
						filename={filename}
						title={value.title || ""}
						language={language}
						showLineNumbers={value.showLineNumbers === "true"}
						highlightLines={value.highlightLines}
						caption={value.caption}
					/>
				);
			}

			// Fallback for unexpected format
			return <p>Error: Invalid code block format</p>;
		},
		// Callout block renderer
		calloutBlock: ({ value }: { value: SanityCalloutBlock }) => (
			<CalloutBlock value={value} />
		),
	},
	marks: {
		// Link annotation
		link: ({ children, value }) => {
			const rel = !value.href.startsWith("/")
				? "noreferrer noopener"
				: undefined;
			const target = value.blank === "true" ? "_blank" : undefined;
			return (
				<Link 
					href={value.href} 
					rel={rel} 
					target={target}
					className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
				>
					{children}
				</Link>
			);
		},
		// Superscript decorator
		sup: ({ children }) => (
			<sup className="text-[0.75em] align-super">{children}</sup>
		),
		// Subscript decorator
		sub: ({ children }) => (
			<sub className="text-[0.75em] align-sub">{children}</sub>
		),
		// Highlight decorator
		highlight: ({ children }) => (
			<mark className="bg-yellow-200 dark:bg-yellow-800/50 px-0.5 rounded">
				{children}
			</mark>
		),
		// Underline decorator
		underline: ({ children }) => (
			<span className="underline decoration-2 underline-offset-2">{children}</span>
		),
		// Strike-through decorator
		"strike-through": ({ children }) => (
			<span className="line-through text-muted-foreground">{children}</span>
		),
		// Inline code decorator
		code: ({ children }) => (
			<code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
				{children}
			</code>
		),
		// Text color annotation
		textColor: ({ children, value }) => (
			<span className={textColorStyles[value?.color] || "inherit"}>
				{children}
			</span>
		),
	},
	block: {
		h1: ({ children }) => (
			<h1 className="text-4xl font-bold mt-10 mb-4 scroll-mt-20">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-3xl font-semibold mt-8 mb-4 scroll-mt-20">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-2xl font-semibold mt-6 mb-3 scroll-mt-20">{children}</h3>
		),
		h4: ({ children }) => (
			<h4 className="text-xl font-semibold mt-5 mb-2 scroll-mt-20">{children}</h4>
		),
		normal: ({ children }) => (
			<p className="leading-7 mb-4">{children}</p>
		),
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-primary/30 pl-4 italic my-6 text-muted-foreground">
				{children}
			</blockquote>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="list-disc ml-6 my-4 space-y-2">{children}</ul>
		),
		number: ({ children }) => (
			<ol className="list-decimal ml-6 my-4 space-y-2">{children}</ol>
		),
	},
	listItem: {
		bullet: ({ children }) => <li className="leading-7">{children}</li>,
		number: ({ children }) => <li className="leading-7">{children}</li>,
	},
};
