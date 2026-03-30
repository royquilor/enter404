import NextImage from "next/image";

/**
 * Aspect-video frame for GIFs. When the user prefers reduced motion, the GIF is
 * hidden (CSS only — no hydration mismatch) and a short static message appears
 * instead. The animated asset may still download; layout stays stable.
 */
export function AspectGifFigure({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 720px",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className="relative mx-auto aspect-video w-full overflow-hidden rounded-sm bg-muted">
      <NextImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized
        className="object-contain motion-reduce:hidden"
        sizes={sizes}
      />
      <div
        className="absolute inset-0 hidden motion-reduce:flex items-center justify-center px-6"
        role="img"
        aria-label={alt}
      >
        <p className="max-w-sm text-center text-xs leading-relaxed text-muted-foreground">
          Animation is off when &quot;Reduce motion&quot; is enabled in your system settings.
        </p>
      </div>
    </div>
  );
}
