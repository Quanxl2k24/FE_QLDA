import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-[#0e150e]/10 bg-[#f4f3e7] py-16 text-[#0e150e]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="text-[28px] font-extrabold tracking-tight text-[#00473c]">
              {siteConfig.name}
            </h3>
            <p className="mt-4 max-w-sm text-[16px] text-[#0e150e]/80 leading-relaxed font-normal">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#00473c]" />
              <span className="text-[12px] uppercase font-bold tracking-widest text-[#0e150e]/70">
                Golden Hour Harvest &bull; Seasonal 2026
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]">
              Collections
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="#baked"
                  className="text-[15px] hover:underline font-medium text-[#0e150e]"
                >
                  Baked Mooncakes →
                </Link>
              </li>
              <li>
                <Link
                  href="#snowskin"
                  className="text-[15px] hover:underline font-medium text-[#0e150e]"
                >
                  Snowskin Artisanal →
                </Link>
              </li>
              <li>
                <Link
                  href="#gift-boxes"
                  className="text-[15px] hover:underline font-medium text-[#0e150e]"
                >
                  Mid-Autumn Gift Boxes →
                </Link>
              </li>
              <li>
                <Link
                  href="#corporate"
                  className="text-[15px] hover:underline font-medium text-[#0e150e]"
                >
                  Corporate Gifting →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]">
              Artisan Story
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="#heritage"
                  className="text-[15px] hover:underline font-medium text-[#0e150e]"
                >
                  Our Heritage →
                </Link>
              </li>
              <li>
                <Link
                  href="#ingredients"
                  className="text-[15px] hover:underline font-medium text-[#0e150e]"
                >
                  Sourcing & Botanicals →
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-[15px] hover:underline font-medium text-[#0e150e]"
                >
                  Bakery Locations →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-[#0e150e]/10 pt-8 sm:flex-row text-[14px] text-[#8c8c82]">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <span className="hover:text-[#00473c] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#00473c] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#00473c] cursor-pointer">Nutritional Guide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
