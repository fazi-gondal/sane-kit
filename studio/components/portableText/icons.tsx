/**
 * Custom SVG icons for the Sanity Studio rich text toolbar.
 * These icons appear in the editor toolbar for custom decorators.
 */

// Superscript icon (x²)
export const SuperscriptIcon = () => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <text 
      x="2" 
      y="18" 
      fontSize="14" 
      fill="currentColor" 
      fontFamily="system-ui"
    >
      x
    </text>
    <text 
      x="12" 
      y="10" 
      fontSize="10" 
      fill="currentColor" 
      fontFamily="system-ui"
    >
      2
    </text>
  </svg>
)

// Subscript icon (x₂)
export const SubscriptIcon = () => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <text 
      x="2" 
      y="14" 
      fontSize="14" 
      fill="currentColor" 
      fontFamily="system-ui"
    >
      x
    </text>
    <text 
      x="12" 
      y="22" 
      fontSize="10" 
      fill="currentColor" 
      fontFamily="system-ui"
    >
      2
    </text>
  </svg>
)

// Highlight icon (marker pen)
export const HighlightIcon = () => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m9 11-6 6v3h9l3-3" />
    <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4" />
    <rect x="14" y="4" width="8" height="8" rx="1" transform="rotate(45 14 4)" fill="#fef08a" fillOpacity="0.5" stroke="none" />
  </svg>
)

// Text color icon (letter A with colored underline)
export const TextColorIcon = () => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <text 
      x="6" 
      y="16" 
      fontSize="14" 
      fill="currentColor" 
      fontFamily="system-ui" 
      fontWeight="bold"
    >
      A
    </text>
    <rect x="4" y="19" width="16" height="3" rx="1" fill="#3b82f6" />
  </svg>
)

// Callout/alert icon
export const CalloutIcon = () => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" />
    <path d="M15 18h-5" />
    <path d="M10 6h8v4h-8V6Z" />
  </svg>
)
