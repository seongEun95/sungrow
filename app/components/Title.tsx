'use client'

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react'

interface TitleProps {
  title: string
  storageKey?: string
}

export default function Title({ title, storageKey }: TitleProps) {
  const key = storageKey ?? `title__${title}`
  const [displayTitle, setDisplayTitle] = useState(title)
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  // 로컬스토리지에서 저장된 값 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      setDisplayTitle(saved)
      setInputValue(saved)
    }
  }, [key])

  // 편집 모드 진입 시 input에 포커스
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const startEditing = () => {
    setInputValue(displayTitle)
    setEditing(true)
  }

  const commitEdit = () => {
    const trimmed = inputValue.trim()
    if (trimmed) {
      setDisplayTitle(trimmed)
      localStorage.setItem(key, trimmed)
    }
    setEditing(false)
  }

  const cancelEdit = () => {
    setInputValue(displayTitle)
    setEditing(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') commitEdit()
    if (e.key === 'Escape') cancelEdit()
  }

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <>
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={commitEdit}
            className="text-[26px] font-medium text-[#333] tracking-tight border-b-2 border-blue-500 bg-transparent outline-none min-w-[120px] w-auto"
            style={{ width: `${Math.max(inputValue.length, 2)}ch` }}
          />
          <button
            onMouseDown={(e) => {
              e.preventDefault() // blur 이전에 클릭 처리
              commitEdit()
            }}
            className="text-xs px-2 py-0.5 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors shrink-0"
          >
            완료
          </button>
        </>
      ) : (
        <h2
          onClick={startEditing}
          title="클릭하여 이름 변경"
          className="text-[26px] font-medium text-[#333] tracking-tight cursor-text hover:text-blue-500 transition-colors select-none"
        >
          {displayTitle}
        </h2>
      )}
    </div>
  )
}