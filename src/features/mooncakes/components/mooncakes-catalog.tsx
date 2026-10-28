"use client";

import { useMooncakes } from "../hooks/use-mooncakes";
import { MooncakeItem } from "../types";
import { CategoryTabs } from "./category-tabs";
import { ProductCard } from "./product-card";

interface MooncakesCatalogProps {
  initialData?: MooncakeItem[];
}

export function MooncakesCatalog({ initialData }: MooncakesCatalogProps) {
  const { filteredMooncakes, activeCategory, setActiveCategory } =
    useMooncakes(initialData);

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12" id="menu">
      <div className="mb-10">
        <span className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]">
          CURATED MENU
        </span>
        <div className="mt-4">
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
      </div>

      {/* 3-Column Product Grid strictly following DESGIN.md */}
      {filteredMooncakes.length > 0 ? (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filteredMooncakes.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[240px] items-center justify-center rounded-[20px] bg-[#d8e5d6]/30">
          <p className="text-[18px] text-[#8c8c82]">
            No mooncakes found for this category.
          </p>
        </div>
      )}
    </section>
  );
}
