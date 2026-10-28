import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]">
        404 — PAGE NOT FOUND
      </span>
      <h2 className="mt-3 text-[48px] font-normal leading-tight text-[#0e150e]">
        A quiet harvest moment.
      </h2>
      <p className="mt-4 max-w-md text-[16px] text-[#0e150e]/70">
        The page you are looking for has been moved or does not exist in our seasonal collection.
      </p>
      <div className="mt-8">
        <Button variant="primary" asChild>
          <Link href="/">RETURN TO BAKERY</Link>
        </Button>
      </div>
    </div>
  );
}
