'use client'

import { generate3D } from '../lib/generate3D'
import { Editor } from '@tldraw/tldraw'
import { useState } from 'react'

export function Generate3DButton() {
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingEnabled, setThinkingEnabled] = useState(false)

  const handleClick = async () => {
    const editor = Editor.getInstance()
    if (!editor) return

    setIsThinking(true)
    try {
      await generate3D(editor, null, thinkingEnabled)
    } catch (e) {
      console.error('Error in 3D generation:', e)
    }
    setIsThinking(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <button
        onClick={handleClick}
        className="tl-button"
        disabled={isThinking}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: isThinking ? 0.5 : 1,
        }}
      >
        <span style={{ fontSize: '16px' }}>🚀</span>
        Make 3D
      </button>
      <div
        style={{
          width: '40px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: thinkingEnabled ? '#4F46E5' : '#e5e7eb',
          cursor: 'pointer',
          transition: 'background-color 0.3s ease',
          position: 'relative',
        }}
        onClick={() => setThinkingEnabled(!thinkingEnabled)}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'white',
            position: 'absolute',
            top: '2px',
            left: thinkingEnabled ? '18px' : '2px',
            transition: 'left 0.3s ease',
          }}
        />
      </div>
    </div>
  )
} 