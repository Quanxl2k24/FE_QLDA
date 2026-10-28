"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getMooncakes } from "../api";
import { MooncakeCategory, MooncakeItem } from "../types";

export function useMooncakes(initialData?: MooncakeItem[]) {
  const [activeCategory, setActiveCategory] = useState<MooncakeCategory>("all");

  const query = useQuery({
    queryKey: ["mooncakes"],
    queryFn: () => getMooncakes(),
    initialData: initialData,
  });

  const filteredMooncakes = useMemo(() => {
    if (!query.data) return [];
    if (activeCategory === "all") return query.data;
    return query.data.filter((item) => item.category === activeCategory);
  }, [query.data, activeCategory]);

  return {
    ...query,
    activeCategory,
    setActiveCategory,
    filteredMooncakes,
  };
}
