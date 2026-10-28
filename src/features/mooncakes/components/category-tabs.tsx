"use client";

import { cn } from "@/lib/utils";
import { MooncakeCategory } from "../types";

interface CategoryTabsProps {
  activeCategory: MooncakeCategory;
  onSelectCategory: (category: MooncakeCategory) => void;
}

const TABS: { id: MooncakeCategory; label: string }[] = [
  { id: "all", label: "Full Collection" },
  { id: "baked", label: "Baked Mooncakes" },
  { id: "snowskin", label: "Snowskin" },
  { id: "gift-boxes", label: "Gift Boxes" },
];

export function CategoryTabs({
  activeCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex w-full overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
      <div className="flex items-center gap-8 md:gap-10">
        {TABS.map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectCategory(tab.id)}
              className={cn(
                "group relative flex flex-col items-center whitespace-nowrap bg-transparent p-0 text-left cursor-pointer transition-opacity",
                isActive ? "opacity-100" : "opacity-45 hover:opacity-75"
              )}
            >
              <span className="text-[28px] md:text-[38px] font-normal leading-[0.95] tracking-tight text-[#0e150e]">
                {tab.label}
              </span>

              {/* 4px dot indicator below active tab */}
              <span
                className={cn(
                  "mt-2 h-1.5 w-1.5 rounded-full bg-[#00473c] transition-all duration-300",
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
