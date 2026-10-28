import { Suspense } from "react";
import {
  HeroBanner,
  MooncakesCatalog,
  SplitFeatureSection,
  getMooncakes,
} from "@/features/mooncakes";
import { Skeleton } from "@/components/ui/skeleton";

export default async function HomePage() {
  // Server Component top-level data fetch
  const mooncakes = await getMooncakes();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <HeroBanner />

      {/* Catalog & Filter Section wrapped in Suspense for streaming */}
      <Suspense
        fallback={
          <div className="mx-auto max-w-[1200px] px-6 py-20 lg:px-12">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          </div>
        }
      >
        <MooncakesCatalog initialData={mooncakes} />
      </Suspense>

      {/* Split Feature Editorial Section (Sage background) */}
      <SplitFeatureSection bgVariant="sage" />
    </div>
  );
}
