"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState, useTransition } from "react";

export default function ReviewStar(props: {
  star: number;
  onStarChange: (star: number) => void;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isPending, startTrabsition] = useTransition();

  return (
    <div
      className={cn("flex items-center gap-1", {
        "animate-pulse": isPending,
      })}
      onMouseLeave={() => setHoverIndex(null)}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index < props.star;
        const isHovering = hoverIndex ? index - 1 < hoverIndex : null;
        return (
          <button
            onMouseEnter={() => {
              if (!isPending) setHoverIndex(index);
            }}
            key={index}
            onClick={() => {
              startTrabsition(() => {
                props.onStarChange(index + 1);
              });
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
