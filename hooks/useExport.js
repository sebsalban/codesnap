"use client";

import { useState } from "react";
import { useSnap } from "@/hooks/useSnap";
import { exportAsPng, exportAsSvg, snapFilename } from "@/lib/imageExport";

// Drives the download flow: idle -> loading ("Rendering…") -> done
// ("Saved to downloads") -> idle again.
export function useExport() {
  const { previewRef, language } = useSnap();
  const [status, setStatus] = useState("idle");

  const run = async (exporter) => {
    if (status !== "idle" || !previewRef.current) return;
    setStatus("loading");
    try {
      await exporter(previewRef.current, snapFilename(language));
      setStatus("done");
      setTimeout(() => setStatus("idle"), 1500);
    } catch (err) {
      console.error("Export failed", err);
      setStatus("idle");
    }
  };

  return {
    status,
    exportPng: () => run(exportAsPng),
    exportSvg: () => run(exportAsSvg),
  };
}
