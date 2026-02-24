"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { Interpretation } from "@/types";
import { cn } from "@/lib/utils";

interface InterpretationCardProps {
  interpretation: Interpretation;
  lang?: "tr" | "en";
  onHighlight?: (box: [number, number, number, number] | null) => void;
  isActive?: boolean;
}

const elementIcons: Record<string, string> = {
  door: "🚪",
  door_size: "🚪",
  windows: "🪟",
  roof: "🏠",
  roof_size: "🏠",
  trunk: "🌳",
  trunk_size: "🌳",
  branches: "🌿",
  tree_overall: "🌲",
  hands: "🖐️",
  eyes: "👁️",
  head: "👤",
  arms: "💪",
  mouth: "👄",
  figure_size: "🧍",
  line_pressure: "✏️",
  shading: "🎨",
  erasures: "🧹",
};

export function InterpretationCard({
  interpretation,
  lang = "tr",
  onHighlight,
  isActive = false,
}: InterpretationCardProps) {
  const [showAlternatives, setShowAlternatives] = useState(false);

  const icon = elementIcons[interpretation.element] || "📝";

  return (
    <Card className={cn("overflow-hidden transition-all", isActive && "ring-2 ring-indigo-500 shadow-lg")}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h4 className="font-medium text-gray-900 capitalize">
              {interpretation.element.replace(/_/g, " ")}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            {interpretation.boundingBox && onHighlight && (
              <button
                onClick={() => onHighlight(isActive ? null : interpretation.boundingBox!)}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isActive ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                )}
                title="Çizimde göster"
              >
                🎯
              </button>
            )}
            <ConfidenceBadge confidence={interpretation.confidence} lang={lang} />
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          <span className="font-medium">
            {lang === "tr" ? "Gözlem:" : "Observation:"}
          </span>{" "}
          {interpretation.observation}
        </p>

        <p className="text-gray-700 mb-3">{interpretation.interpretation}</p>

        {/* Sources */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>📚</span>
          <span>
            {interpretation.sources
              .map((s) => `${s.author} (${s.year})`)
              .join(", ")}
          </span>
        </div>

        {/* Alternative Views */}
        {interpretation.alternativeViews &&
          interpretation.alternativeViews.length > 0 && (
            <div className="mt-3">
              <button
                onClick={() => setShowAlternatives(!showAlternatives)}
                className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                💡 {lang === "tr" ? "Alternatif Görüş" : "Alternative View"}
                <span
                  className={cn(
                    "transition-transform",
                    showAlternatives && "rotate-180"
                  )}
                >
                  ▼
                </span>
              </button>

              {showAlternatives && (
                <div className="mt-2 p-3 bg-gray-50 rounded-lg text-sm">
                  {interpretation.alternativeViews.map((view, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <p className="text-gray-700">{view.interpretation}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        — {view.source.author} ({view.source.year})
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
      </CardContent>
    </Card>
  );
}
