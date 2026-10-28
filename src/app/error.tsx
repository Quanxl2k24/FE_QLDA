"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <span className="text-[14px] font-bold uppercase tracking-[0.05em] text-[#00473c]">
        ERROR
      </span>
      <h2 className="mt-3 text-[42px] font-normal text-[#0e150e]">
        Something went wrong.
      </h2>
      <p className="mt-3 max-w-md text-[16px] text-[#0e150e]/70">
        We encountered an unexpected issue while preparing your view.
      </p>
      <div className="mt-8 flex gap-4">
        <Button variant="primary" onClick={() => reset()}>
          TRY AGAIN
        </Button>
      </div>
    </div>
  );
}
