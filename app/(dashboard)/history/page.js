"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Plus, Trash2 } from "lucide-react";
import AppShell from "@/components/ui/AppShell";
import Dialog, { DialogButton } from "@/components/ui/Dialog";
import { useSnap } from "@/hooks/useSnap";
import { useUser } from "@/hooks/useUser";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getTheme } from "@/lib/constants/themes";
import { getBackgroundCss } from "@/lib/constants/backgrounds";

const relativeDate = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "Last week";
  if (weeks < 5) return `${weeks} weeks ago`;
  return new Date(iso).toLocaleDateString();
};

const newSnapButton = {
  border: "none",
  cursor: "pointer",
  background: "var(--accent)",
  color: "#fff",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  fontWeight: 600,
  padding: "12px 24px",
  borderRadius: 6,
  transition: "background 200ms var(--ease)",
};

const iconButton = {
  width: 32,
  height: 32,
  padding: 0,
  borderRadius: 8,
  border: "1px solid var(--border)",
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "var(--text-secondary)",
  cursor: "pointer",
  transition: "border-color 200ms var(--ease), color 200ms var(--ease)",
};

// Snaps are fetched a page at a time so a large history doesn't arrive
// in one unbounded query.
const PAGE_SIZE = 50;

function CenteredNotice({ title, body, children }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          maxWidth: 440,
          textAlign: "center",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 32,
        }}
      >
        <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, letterSpacing: "-0.5px" }}>
          {title}
        </div>
        <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 10, lineHeight: 1.6 }}>{body}</div>
        {children && <div style={{ marginTop: 22, display: "flex", justifyContent: "center", gap: 10 }}>{children}</div>}
      </div>
    </div>
  );
}

function SnapCard({ row, onLoad, onDelete }) {
  const theme = getTheme(row.theme);
  const lines = (row.code || "").split("\n").slice(0, 3);
  const lineColors = [theme.c.kw, theme.c.str, theme.c.pn];

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 16,
        background: "var(--bg-surface)",
        transition: "border-color 200ms var(--ease), box-shadow 200ms var(--ease)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(244,114,182,.4)";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(244,114,182,.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ background: getBackgroundCss(row.background, row.custom_color), borderRadius: 8, padding: 22 }}>
        <div
          style={{
            background: theme.bg,
            borderRadius: 6,
            padding: 14,
            fontFamily: "var(--font-fira-code), monospace",
            fontSize: 9,
            lineHeight: 1.8,
            whiteSpace: "pre",
            overflow: "hidden",
          }}
        >
          {lines.map((line, i) => (
            <div key={i} style={{ color: lineColors[i % lineColors.length], overflow: "hidden", textOverflow: "ellipsis" }}>
              {line || " "}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14 }}>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 15,
              color: "var(--text-primary)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.title || "Untitled snap"}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 2 }}>{relativeDate(row.created_at)}</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button
            title="Load"
            aria-label={`Load "${row.title || "Untitled snap"}" into the editor`}
            onClick={onLoad}
            style={iconButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <ArrowUpRight size={15} aria-hidden />
          </button>
          <button
            title="Delete"
            aria-label={`Delete "${row.title || "Untitled snap"}"`}
            onClick={onDelete}
            style={iconButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--danger)";
              e.currentTarget.style.color = "var(--danger)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            <Trash2 size={14} aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}

function HistoryContent() {
  const router = useRouter();
  const { loadSnap } = useSnap();
  const { user, loading: userLoading, supabase } = useUser();
  const [snaps, setSnaps] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null); // row awaiting confirmation
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const fetchPage = useCallback(
    async (from) => {
      const { data, error } = await supabase
        .from("snaps")
        .select("*")
        .order("created_at", { ascending: false })
        .range(from, from + PAGE_SIZE - 1);
      if (error) {
        console.error("Failed to load snaps", error);
        return { rows: [], more: false };
      }
      const rows = data || [];
      return { rows, more: rows.length === PAGE_SIZE };
    },
    [supabase]
  );

  useEffect(() => {
    if (!supabase || !user) return;
    let cancelled = false;
    fetchPage(0).then(({ rows, more }) => {
      if (cancelled) return;
      setSnaps(rows);
      setHasMore(more);
    });
    return () => {
      cancelled = true;
    };
  }, [supabase, user, fetchPage]);

  const loadMore = async () => {
    if (loadingMore || !snaps) return;
    setLoadingMore(true);
    const { rows, more } = await fetchPage(snaps.length);
    setSnaps((prev) => [...(prev || []), ...rows]);
    setHasMore(more);
    setLoadingMore(false);
  };

  if (!isSupabaseConfigured()) {
    return (
      <CenteredNotice
        title="History needs Supabase."
        body="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local and run supabase/schema.sql to enable saved snaps. Everything else works without it."
      />
    );
  }

  if (userLoading) return null;

  if (!user) {
    return (
      <CenteredNotice title="Save your snaps." body="Sign in to keep a history of your snaps and load them anywhere.">
        <Link
          href="/register"
          style={{ ...newSnapButton, display: "inline-block" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
        >
          Create free account
        </Link>
        <Link
          href="/login"
          style={{
            display: "inline-block",
            background: "transparent",
            color: "var(--accent)",
            border: "1px solid var(--accent)",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 500,
            padding: "11px 24px",
            borderRadius: 6,
            transition: "background 200ms var(--ease)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-soft)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Sign in
        </Link>
      </CenteredNotice>
    );
  }

  const requestDelete = (row) => {
    setDeleteError(null);
    setPendingDelete(row);
  };

  const confirmDelete = async () => {
    if (deleting || !pendingDelete) return;
    setDeleting(true);
    setDeleteError(null);
    const { error } = await supabase.from("snaps").delete().eq("id", pendingDelete.id);
    setDeleting(false);
    if (error) {
      setDeleteError(`Could not delete snap: ${error.message}`);
      return;
    }
    setSnaps((prev) => prev.filter((s) => s.id !== pendingDelete.id));
    setPendingDelete(null);
  };

  const load = (row) => {
    loadSnap(row);
    router.push("/");
  };

  return (
    <div style={{ position: "absolute", inset: 0, overflowY: "auto", padding: "40px 56px 56px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 600, letterSpacing: "-0.5px" }}>
            Your snaps
          </div>
          <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6 }}>
            {snaps === null ? "Loading…" : `${snaps.length}${hasMore ? "+" : ""} saved · synced to your account`}
          </div>
        </div>
        <Link
          href="/"
          style={{ ...newSnapButton, display: "inline-flex", alignItems: "center", gap: 7 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
        >
          <Plus size={15} aria-hidden /> New snap
        </Link>
      </div>

      {snaps !== null && snaps.length === 0 ? (
        <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
          No snaps yet — head back to the editor and hit “Save snap”.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {(snaps || []).map((row) => (
            <SnapCard key={row.id} row={row} onLoad={() => load(row)} onDelete={() => requestDelete(row)} />
          ))}
        </div>
      )}

      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <button
            onClick={loadMore}
            disabled={loadingMore}
            style={{
              background: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 500,
              padding: "10px 28px",
              borderRadius: 6,
              cursor: loadingMore ? "default" : "pointer",
              opacity: loadingMore ? 0.6 : 1,
              transition: "background 200ms var(--ease)",
            }}
            onMouseEnter={(e) => {
              if (!loadingMore) e.currentTarget.style.background = "var(--accent-soft)";
            }}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {loadingMore ? "Loading…" : "Load more"}
          </button>
        </div>
      )}

      <Dialog
        open={pendingDelete !== null}
        onClose={() => !deleting && setPendingDelete(null)}
        title="Delete this snap?"
        body={`"${pendingDelete?.title || "Untitled snap"}" will be removed from your history. This can't be undone.`}
        error={deleteError}
      >
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <DialogButton variant="ghost" disabled={deleting} onClick={() => setPendingDelete(null)}>
            Cancel
          </DialogButton>
          <DialogButton variant="danger" disabled={deleting} onClick={confirmDelete}>
            {deleting ? "Deleting…" : "Delete"}
          </DialogButton>
        </div>
      </Dialog>
    </div>
  );
}

export default function HistoryPage() {
  return (
    <AppShell>
      <HistoryContent />
    </AppShell>
  );
}
