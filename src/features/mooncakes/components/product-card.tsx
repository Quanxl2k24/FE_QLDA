"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import { MooncakeItem } from "../types";
import { useState } from "react";

interface ProductCardProps {
  item: MooncakeItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleOrder = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.imageUrl,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <article className="group flex flex-col">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[20px] bg-[#d8e5d6]/30">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Online Only Badge */}
        {item.isOnlineOnly && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="lime">ONLINE ONLY</Badge>
          </div>
        )}

        {/* Quick price tag */}
        <div className="absolute bottom-3 right-3 rounded-full bg-[#0e150e]/80 px-3 py-1 backdrop-blur-md">
          <span className="text-[13px] font-bold text-[#f4f3e7]">
            {formatCurrency(item.price)}
          </span>
        </div>
      </div>

      {/* Product Information - strictly following DESGIN.md */}
      <div className="flex flex-1 flex-col pt-6">
        <h3 className="text-[20px] font-bold leading-snug text-[#0e150e]">
          {item.name}
        </h3>

        <p className="mt-2 text-[15px] leading-[1.3] text-[#0e150e]/80 font-normal line-clamp-2">
          {item.fillingDescription}
        </p>

        {/* Ghost Text Link: 'Order now →' */}
        <div className="mt-4 pt-2">
          <Button
            variant="ghost-link"
            size="md"
            onClick={handleOrder}
            className="group/btn"
          >
            {isAdded ? "Added to Bag ✓" : "Order now →"}
          </Button>
        </div>
      </div>
    </article>
  );
}
