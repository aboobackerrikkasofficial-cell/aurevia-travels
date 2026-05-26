import { useState, useEffect, useRef } from 'react'

export default function LuxuryImage({
  src,
  alt,
  className = '',
  aspectRatio = '16/10',
  priority = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority) // If priority, load immediately
  const imgRef = useRef(null)

  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // Load images 200px before they enter viewport
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  // A tiny, inline base64 blurred SVG to use as a placeholder
  const placeholderSvg = `data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27 viewBox%3D%270 0 100 62.5%27%3E%3Crect width%3D%27100%25%27 height%3D%27100%25%27 fill%3D%27%230f0f13%27%2F%3E%3Cpath d%3D%27M30 40 l15-20 l10 12 l15-18 l15 26 z%27 fill%3D%27%2316161c%27%2F%3E%3C%2Fsvg%3E`

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden w-full bg-[#0f0f13] transition-all duration-500`}
      style={{ aspectRatio }}
    >
      {/* Low-res blur-up placeholder */}
      {!isLoaded && (
        <img
          src={placeholderSvg}
          alt="placeholder"
          className="absolute inset-0 w-full h-full object-cover blur-md scale-105 pointer-events-none"
        />
      )}

      {/* Real image */}
      {(isInView || priority) && (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-102 blur-sm'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  )
}
