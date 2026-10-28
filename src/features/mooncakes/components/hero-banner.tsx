import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroBanner() {
  return (
    <section className="relative h-[85vh] min-h-[580px] w-full overflow-hidden bg-[#0e150e]">
      {/* Full-bleed hero background photo */}
      <Image
        src="https://images.unsplash.com/photo-1599785209707-a456fc1337bb?q=80&w=1920&auto=format&fit=crop"
        alt="Artisan Mooncake Golden Hour Harvest"
        fill
        priority
        className="object-cover object-center opacity-90"
      />

      {/* Subtle overlay gradient to ensure readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      {/* Text overlay panel anchored bottom-left */}
      <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 lg:bottom-16 lg:left-24 max-w-[580px] rounded-[24px] bg-[#f4f3e7]/95 p-8 sm:p-10 backdrop-blur-md shadow-2xl">
        <span className="block text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]">
          FULL MOON HARVEST 2026
        </span>

        <h1 className="mt-2 text-[48px] sm:text-[68px] lg:text-[76px] font-normal leading-[0.88] tracking-[-0.02em] text-[#0e150e]">
          The Golden Yolk Collection
        </h1>

        <p className="mt-4 text-[16px] leading-relaxed text-[#0e150e]/80">
          Handcrafted white lotus seed paste, double cured salted egg yolks, encased in warm golden crusts baked daily at sunrise.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <Button variant="primary" size="lg" asChild>
            <Link href="#menu">ORDER NOW</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link href="#heritage">OUR STORY</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
