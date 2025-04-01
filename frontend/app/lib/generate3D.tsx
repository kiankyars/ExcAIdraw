import { Editor, TLShapeId } from '@tldraw/tldraw'
import { getHeaders } from '../utils/apiKeys'

export async function generate3D(editor: Editor, shapeId: TLShapeId | null = null, thinkingMode: boolean = false) {
  // Get the current selection
  const selectedShapes = shapeId 
    ? [editor.getShape(shapeId)!]
    : editor.getSelectedShapes()

  if (selectedShapes.length === 0) {
    throw new Error('No shapes selected')
  }

  // Get the SVG data
  const svg = await editor.getSvg(selectedShapes)
  if (!svg) {
    throw new Error('Could not get SVG')
  }

  const svgString = new XMLSerializer().serializeToString(svg)

  // Send to backend
  const response = await fetch('http://localhost:8000/api/cerebras/parse', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    body: JSON.stringify({
      svg: svgString,
      thinking_mode: thinkingMode,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate 3D model')
  }

  const data = await response.json()
  return data
} 