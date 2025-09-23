"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

export default function ReviewStar(props: {
  star: number;
  setNewStar: (star: number) => void;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div
      className="flex items-center gap-1"
      onMouseLeave={() => setHoverIndex(null)}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < props.star;
        const isHovering = hoverIndex ? index - 1 < hoverIndex : null;
        return (
          <button
            onMouseEnter={() => setHoverIndex(index)}
            key={index}
            onClick={() => {
              props.setNewStar(index + 1);
            }}
          >
            <Star
              className={cn(
                "h-6 w-5 text-yellow-400 transition cursor-pointer",
                {
                  "fill-yellow-400": isFilled,
                  "-translate-y-0.5 fill-orange-500 text-orange-500":
                    isHovering,
                }
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
