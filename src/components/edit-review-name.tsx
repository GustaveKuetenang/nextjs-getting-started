"use client";

import { cn } from "@/lib/utils";
import { Check, Edit } from "lucide-react";
import { useOptimistic, useRef, useState, useTransition } from "react";

export function EditReviewName(props: {
  children: string;
  setName: (newName: string) => void;
  className?: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  const [name, setName] = useOptimistic(
    props.children,
    (_, newName: string) => newName
  );

  const [isEditPending, startTransition] = useTransition();

  const submit = () => {
    setIsEditing(false);
    const newName = ref.current?.value || "";
    startTransition(() => {
      setName(newName);
    });
    props.setName(newName);
  };

  if (isEditing) {
    return (
      <div className="group flex items-center gap-3">
        <input
          className={cn(props.className)}
          defaultValue={props.children}
          ref={ref}
          style={{
            // @ts-expect-error - new field api
            fieldSizing: "content",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              submit();
            }
          }}
        />
        <button
          className="group-hover:opacity-100 opacity-0 bg-accent p-1 rounded-rounded"
          onClick={() => {
            submit();
          }}
        >
          <Check size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="group flex items-center gap-3">
      <p className={cn(props.className, { "animate-pulse": isEditPending })}>
        {name}
      </p>
      <button
        className="group-hover:opacity-100 opacity-0 bg-accent p-1 rounded-rounded"
        onClick={() => {
          setIsEditing(true);
          setTimeout(() => {
            ref.current?.select();
          }, 1);
        }}
      >
        <Edit size={14} />
      </button>
    </div>
  );
}
