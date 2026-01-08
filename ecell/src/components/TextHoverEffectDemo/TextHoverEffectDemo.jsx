import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";

export function TextHoverEffectDemo() {
  return (
    <div className="h-[40rem] flex text-gray-700 items-center justify-center">
      <TextHoverEffect className="text-gray-800" text="E'LITES" alwaysActive={true} />
    </div>
  );
}
