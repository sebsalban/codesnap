"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Link2 } from "lucide-react";
import { useSnap } from "@/hooks/useSnap";
import { useExport } from "@/hooks/useExport";
import { buildShareUrl } from "@/lib/share";
import Logo from "@/components/ui/Logo";
import ExportButton from "@/components/ui/ExportButton";
import SaveButton from "@/components/ui/SaveButton";
import CodeEditor from "@/components/editor/CodeEditor";
import LanguageSelector from "@/components/editor/LanguageSelector";
import ThemeSelector from "@/components/controls/ThemeSelector";
import BackgroundSelector from "@/components/controls/BackgroundSelector";
import WindowStylePicker from "@/components/controls/WindowStylePicker";
import FontSelector from "@/components/controls/FontSelector";
import Slider from "@/components/controls/Slider";

const sectionLabel = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  color: "var(--text-secondary)",
};

const controlLabel = { fontSize: 13, color: "var(--text-primary)" };

function Tab({ href, active, children }) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 0.5,
        padding: "6px 10px",
        borderRadius: 6,
        background: active ? "var(--accent-soft)" : "transparent",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        transition: "background 200ms var(--ease), color 200ms var(--ease)",
      }}
    >
      {children}
    </Link>
  );
}

export default function ControlPanel() {
  const snap = useSnap();
  const pathname = usePathname();
  const { status, exportPng, exportSvg } = useExport();
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(buildShareUrl(snap));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div
      style={{
        width: 380,
        flex: "0 0 380px",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-base)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "24px 24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Logo />
        <div
          style={{
            display: "flex",
            padding: 3,
            gap: 2,
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            borderRadius: 8,
          }}
        >
          <Tab href="/" active={pathname === "/"}>
            Editor
          </Tab>
          <Tab href="/history" active={pathname === "/history"}>
            History
          </Tab>
        </div>
      </div>

      {/* Scrollable controls */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 0" }}>
        <div style={{ ...sectionLabel, marginBottom: 10 }}>Your code</div>
        <CodeEditor />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
          <LanguageSelector />
          <div style={{ fontSize: 13, color: "var(--text-secondary)", fontFamily: "var(--font-fira-code), monospace" }}>
            {snap.code ? snap.code.split("\n").length : 0} lines
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
            margin: "24px 0",
          }}
        />

        <div style={{ ...sectionLabel, marginBottom: 12 }}>Appearance</div>

        <div style={{ ...controlLabel, marginBottom: 10 }}>Theme</div>
        <ThemeSelector />

        <div style={{ ...controlLabel, margin: "22px 0 10px" }}>Background</div>
        <BackgroundSelector />

        <div style={{ ...controlLabel, margin: "22px 0 10px" }}>Window style</div>
        <WindowStylePicker />

        <div style={{ ...controlLabel, margin: "22px 0 10px" }}>Font</div>
        <FontSelector />

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 22 }}>
          <Slider
            label="Padding"
            min={16}
            max={96}
            step={4}
            value={snap.padding}
            onChange={(padding) => snap.update({ padding })}
          />
          <Slider
            label="Font size"
            min={11}
            max={24}
            value={snap.fontSize}
            onChange={(fontSize) => snap.update({ fontSize })}
          />
          <Slider
            label="Border radius"
            min={0}
            max={28}
            value={snap.radius}
            onChange={(radius) => snap.update({ radius })}
          />

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13 }}>Shadow</span>
            <div
              onClick={() => snap.update({ shadow: !snap.shadow })}
              style={{
                width: 40,
                height: 22,
                borderRadius: 999,
                background: snap.shadow ? "var(--accent)" : "var(--border)",
                padding: 3,
                boxSizing: "border-box",
                cursor: "pointer",
                transition: "background 200ms var(--ease)",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 999,
                  background: "#fff",
                  transform: snap.shadow ? "translateX(18px)" : "translateX(0)",
                  transition: "transform 200ms var(--ease)",
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ height: 24 }} />
      </div>

      {/* Actions footer */}
      <div
        style={{
          padding: "16px 24px 24px",
          borderTop: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          background: "var(--bg-base)",
        }}
      >
        <ExportButton status={status} onClick={exportPng} />

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={exportSvg}
            style={{
              flex: 1,
              background: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              fontWeight: 500,
              padding: "12px 24px",
              borderRadius: 6,
              cursor: "pointer",
              transition: "background 200ms var(--ease)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-soft)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            Download SVG
          </button>
          <SaveButton />
        </div>

        <div
          onClick={copyLink}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 13,
            color: copied ? "var(--success)" : "var(--text-secondary)",
            cursor: "pointer",
            padding: 4,
            transition: "color 200ms var(--ease)",
          }}
          onMouseEnter={(e) => {
            if (!copied) e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            if (!copied) e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          {copied ? <Check size={13} aria-hidden /> : <Link2 size={13} aria-hidden />}
          {copied ? "Link copied" : "Copy link"}
        </div>
      </div>
    </div>
  );
}
