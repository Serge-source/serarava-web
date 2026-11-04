'use client'

interface ImageSlotProps {
  placeholder?: string
  className?: string
  contain?: boolean
}

export default function ImageSlot({ placeholder, className = '', contain = false }: ImageSlotProps) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-sand ${className}`}
      aria-hidden="true"
    >
      {placeholder && (
        <span
          className="text-center text-sm text-bronze px-4 leading-relaxed"
          style={{ fontFamily: 'var(--font-lato)' }}
        >
          {placeholder}
        </span>
      )}
    </div>
  )
}
