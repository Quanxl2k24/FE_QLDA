import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SplitFeatureSectionProps {
  bgVariant?: "sage" | "sand";
}

export function SplitFeatureSection({
  bgVariant = "sage",
}: SplitFeatureSectionProps) {
  const bgClass = bgVariant === "sage" ? "bg-[#d8e5d6]" : "bg-[#e8dcc6]";

  return (
    <section className={`w-full py-20 lg:py-28 ${bgClass}`} id="heritage">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Text Stack */}
          <div className="flex flex-col">
            <span className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]">
              ARTISANAL HERITAGE & SOURCING
            </span>

            <h2 className="mt-3 text-[42px] sm:text-[54px] lg:text-[62px] font-normal leading-[0.95] text-[#0e150e]">
              Rooted in botanical purity and timeless craft.
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <h4 className="text-[18px] font-bold text-[#0e150e]">
                  Single-Origin Hunan Lotus Seeds
                </h4>
                <p className="mt-1 text-[16px] leading-relaxed text-[#0e150e]/80">
                  Slow-simmered for eight hours with organic maltose and cold-pressed peanut oil until silkily caramel.
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-bold text-[#0e150e]">
                  Golden Cured Salted Yolks
                </h4>
                <p className="mt-1 text-[16px] leading-relaxed text-[#0e150e]/80">
                  Pasture-raised duck eggs cured in mineral-rich sea salt for 35 days, steamed with aged Chinese rice wine.
                </p>
              </div>

              <div>
                <h4 className="text-[18px] font-bold text-[#0e150e]">
                  Zero Artificial Preservatives
                </h4>
                <p className="mt-1 text-[16px] leading-relaxed text-[#0e150e]/80">
                  Freshly prepared each morning in limited batches. Best enjoyed within 14 days of harvest.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Button variant="forest" size="md" asChild>
                <Link href="#menu">EXPLORE INGREDIENTS →</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Full-bleed Mooncake Photograph with 20px radius */}
          <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden rounded-[20px] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop"
              alt="Artisan Pastry Preparation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
