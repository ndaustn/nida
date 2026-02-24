"use client";

import { cn, getConfidenceColor, getConfidenceLabel } from "@/lib/utils";
import { ConfidenceLevel } from "@/types";

interface ConfidenceBadgeProps {
  confidence: ConfidenceLevel;
  lang?: "tr" | "en";
  showBar?: boolean;
}

export function ConfidenceBadge({
  confidence,
  lang = "tr",
  showBar = true,
}: ConfidenceBadgeProps) {
  const barWidth = {
    high: "w-full",
    moderate: "w-2/3",
    low: "w-1/3",
  };

  const barColor = {
    high: "bg-green-500",
    moderate: "bg-blue-500",
    low: "bg-yellow-500",
  };

  return (
    <div className="flex items-center gap-2">
      {showBar && (
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              barWidth[confidence],
              barColor[confidence]
            )}
          />
        </div>
      )}
      <span
        className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          getConfidenceColor(confidence)
        )}
      >
        {getConfidenceLabel(confidence, lang)}
      </span>
    </div>
  );
}
