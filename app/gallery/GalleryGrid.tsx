'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import ImageSlot from '@/components/ImageSlot'
import { gallery, galleryCats } from '@/content/seed'

type Filter = 'All' | (typeof galleryCats)[number]

const filters: Filter[] = ['All', ...galleryCats]

export default function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>('All')
  const [open, setOpen] = useState(-1)

  const shown = gallery.filter(g => filter === 'All' || g.cat === filter)

  const close = useCallback(() => setOpen(-1), [])
  const prev = useCallback(() => setOpen(i => (i - 1 + shown.length) % shown.length), [shown.length])
  const next = useCallback(() => setOpen(i => (i + 1) % shown.length), [shown.length])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (open < 0) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close, prev, next])

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = open >= 0 ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const current = open >= 0 ? shown[open] : null

  return (
    <>
      <section aria-label="Photo gallery" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 112px' }}>
        {/* Filter tabs */}
        <div
          role="tablist"
          aria-label="Filter gallery"
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 40 }}
        >
          {filters.map(f => (
            <button
              key={f}
              role="tab"
              aria-selected={f === filter}
              onClick={() => { setFilter(f); setOpen(-1) }}
              style={{
                padding: '11px 20px',
                borderRadius: 9999,
                border: `1px solid ${f === filter ? '#263D35' : 'rgba(38,61,53,0.25)'}`,
                background: f === filter ? '#263D35' : 'transparent',
                color: f === filter ? '#F8F6F1' : '#263D35',
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all .2s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gridAutoRows: 240,
            gridAutoFlow: 'dense',
            gap: 14,
          }}
        >
          {shown.map((g, idx) => (
            <figure
              key={g.id}
              style={{
                margin: 0,
                position: 'relative',
                borderRadius: 20,
                overflow: 'hidden',
                background: '#E8DDCC',
                gridRow: idx % 5 === 0 ? 'span 2' : undefined,
              }}
            >
              <ImageSlot placeholder={g.caption} />
              <figcaption
                style={{
                  position: 'absolute',
                  left: 12,
                  bottom: 12,
                  padding: '6px 12px',
                  borderRadius: 9999,
                  background: 'rgba(248,246,241,0.94)',
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#263D35',
                  pointerEvents: 'none',
                }}
              >
                {g.cat}
              </figcaption>
              <button
                onClick={() => setOpen(idx)}
                aria-label={`View ${g.caption} fullscreen`}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  width: 40,
                  height: 40,
                  border: 'none',
                  borderRadius: 9999,
                  background: 'rgba(38,61,53,0.88)',
                  color: '#F8F6F1',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background .2s',
                }}
                className="hover:!bg-forest"
              >
                <Maximize2 size={16} />
              </button>
            </figure>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            background: 'rgba(20,32,28,0.96)',
            display: 'flex',
            flexDirection: 'column',
            padding: 24,
          }}
        >
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#F8F6F1', paddingBottom: 16 }}>
            <span style={{ fontSize: 14, color: '#E8DDCC' }}>
              {open + 1} / {shown.length} · {current.caption}
            </span>
            <button
              onClick={close}
              aria-label="Close"
              style={{
                width: 46,
                height: 46,
                border: '1px solid rgba(248,246,241,0.3)',
                borderRadius: 9999,
                background: 'transparent',
                color: '#F8F6F1',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={22} />
            </button>
          </div>

          {/* Image + nav */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16, minHeight: 0 }}>
            <button
              onClick={prev}
              aria-label="Previous image"
              style={{ width: 52, height: 52, flexShrink: 0, border: '1px solid rgba(248,246,241,0.3)', borderRadius: 9999, background: 'transparent', color: '#F8F6F1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronLeft size={26} />
            </button>
            <div style={{ position: 'relative', flex: 1, height: '100%', borderRadius: 18, overflow: 'hidden', background: '#263D35' }}>
              <ImageSlot placeholder={current.caption} />
            </div>
            <button
              onClick={next}
              aria-label="Next image"
              style={{ width: 52, height: 52, flexShrink: 0, border: '1px solid rgba(248,246,241,0.3)', borderRadius: 9999, background: 'transparent', color: '#F8F6F1', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ChevronRight size={26} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
