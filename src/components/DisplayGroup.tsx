import React from "react";
import { FlipCard } from "./FlipCard";

interface DisplayGroupProps {
  label?: string;
  value: number;
  flip?: boolean;
  isMinor?: boolean;
}

export const DisplayGroup: React.FC<DisplayGroupProps> = ({
  label,
  value,
  flip,
  isMinor,
}) => {
  const str = String(value).padStart(2, "0");
  const gap = isMinor
    ? "gap-[clamp(2px,0.5vw,4px)]"
    : "gap-[clamp(4px,1vw,8px)]";

  return (
    <div className={`flex flex-col items-center gap-2.5`}>
      <div className={`flex ${gap}`}>
        <FlipCard digit={str[0]} flip={flip} isMinor={isMinor} />
        <FlipCard digit={str[1]} flip={flip} isMinor={isMinor} />
      </div>
      <div className="text-[#06210f] font-semibold text-[clamp(11px,1.6vw,15px)] tracking-[0.04em]">
        {label}
      </div>
    </div>
  );
};
