import type { ReactNode } from 'react'

/**
 * Custom decorator components for rendering text formatting in Sanity Studio's editor.
 * These provide visual preview of decorators while editing content.
 */

// Superscript decorator - renders text as superscript in the editor
export const SuperscriptDecorator = ({ children }: { children: ReactNode }) => (
  <sup style={{ fontSize: '0.75em', verticalAlign: 'super' }}>{children}</sup>
)

// Subscript decorator - renders text as subscript in the editor
export const SubscriptDecorator = ({ children }: { children: ReactNode }) => (
  <sub style={{ fontSize: '0.75em', verticalAlign: 'sub' }}>{children}</sub>
)

// Highlight decorator - renders text with a yellow highlight background
export const HighlightDecorator = ({ children }: { children: ReactNode }) => (
  <mark 
    style={{ 
      backgroundColor: '#fef08a', 
      padding: '0 2px', 
      borderRadius: '2px' 
    }}
  >
    {children}
  </mark>
)

// Text color decorator - renders text with a specific color
export const TextColorDecorator = ({ 
  children, 
  color 
}: { 
  children: ReactNode
  color?: string 
}) => {
  const colorMap: Record<string, string> = {
    red: '#ef4444',
    blue: '#3b82f6',
    green: '#22c55e',
    yellow: '#eab308',
    purple: '#a855f7',
    muted: '#6b7280',
  }
  
  return (
    <span style={{ color: colorMap[color || 'inherit'] || 'inherit' }}>
      {children}
    </span>
  )
}
