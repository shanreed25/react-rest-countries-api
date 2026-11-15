import { useState } from "react";
import type { FlagProps } from "../types/countryDisplayTypes";

export function Flag({ src, alt = "", className = "" }: FlagProps) {
  // Remembers that this one image failed, so the placeholder replaces it
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex aspect-33/20 w-full items-center justify-center bg-element-bg text-sm text-muted-text ${className}`}>
        No flag available
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={264}
      height={160}
      loading="lazy"
      onError={() => setFailed(true)} //runs when the browser cannot load the image
      className={`aspect-33/20 w-full object-cover ${className}`}
    />
  );
}