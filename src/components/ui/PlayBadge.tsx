import Image from "next/image";
import * as React from "react";

/**
 * A small angled play/triangle badge used on the "EXPLORE APPS" CTA.
 * Intentionally built from the site's own brand colors (cyan + neon
 * green) rather than reproducing any third-party app-store mark.
 */
export function PlayBadge({ className }: { className?: string }) {
  return (
    <Image 
      src="/images/playstore.png" 
      alt="Play Badge" 
      width={100} 
      height={100} 
      className={`object-contain ${className || ''}`}
    />
  );
}