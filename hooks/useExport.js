"use client";

import { useSnap } from "@/hooks/useSnap";
import { exportAsPng, exportAsSvg, snapFilename } from "@/lib/imageExport";

// Drives the download flow: idle -> loading ("Rendering…") -> done
// ("Saved to downloads") -> idle again. Status is shared via SnapContext,
// so the panel and inline preview buttons stay in sync and an export in
// flight blocks every surface, not just the one that started it.
export function useExport() {
  const { previewRef, language, exportStatus, setExportStatus } = useSnap();

  const run = async (exporter) => {
    if (exportStatus !== "idle" || !previewRef.current) return;
    setExportStatus("loading");
    try {
      await exporter(previewRef.current, snapFilename(language));
      setExportStatus("done");
      setTimeout(() => setExportStatus("idle"), 1500);
    } catch (err) {
      console.error("Export failed", err);
      setExportStatus("idle");
    }
  };

  return {
    status: exportStatus,
    exportPng: () => run(exportAsPng),
    exportSvg: () => run(exportAsSvg),
  };
}
