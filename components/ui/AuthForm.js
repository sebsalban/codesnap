"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { getSupabase } from "@/lib/supabase";

function Field({ label, ...rest }) {
  const [focus, setFocus] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 500,
          color: "var(--text-secondary)",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 15,
          color: "var(--text-primary)",
          background: "var(--bg-base)",
          border: `1px solid ${focus ? "var(--accent)" : "var(--border)"}`,
          borderRadius: 8,
          padding: "12px 16px",
          outline: "none",
          boxShadow: focus ? "0 0 0 3px var(--accent-glow)" : "none",
          transition: "border-color 200ms var(--ease), box-shadow 200ms var(--ease)",
        }}
        {...rest}
      />
    </div>
  );
}

export default function AuthForm({ mode }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const supabase = getSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!supabase) {
      setError("Supabase isn't configured yet. Add your credentials to .env.local first.");
      return;
    }
    setLoading(true);
    if (isLogin) {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (err) return setError(err.message);
      router.push("/");
    } else {
      const { data, error: err } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (err) return setError(err.message);
      if (data.session) return router.push("/");
      setInfo("Check your email to confirm your account.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
        background: "var(--bg-base)",
        padding: 24,
      }}
    >
      <Link href="/" style={{ color: "inherit" }}>
        <Logo />
      </Link>

      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 400,
          boxSizing: "border-box",
          background: "var(--bg-surface)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 32,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: "var(--text-primary)",
            }}
          >
            {isLogin ? "Welcome back." : "Create your account."}
          </div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 6 }}>
            {isLogin ? "Sign in to access your saved snaps." : "Save your snaps. Access them anywhere."}
          </div>
        </div>

        <Field
          label="Email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          label="Password"
          type="password"
          required
          minLength={6}
          autoComplete={isLogin ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div style={{ fontSize: 13, color: "var(--danger)" }}>{error}</div>}
        {info && <div style={{ fontSize: 13, color: "var(--success)" }}>{info}</div>}

        <button
          type="submit"
          disabled={loading}
          style={{
            border: "none",
            cursor: loading ? "wait" : "pointer",
            background: "var(--accent)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            fontWeight: 600,
            padding: "13px 24px",
            borderRadius: 6,
            opacity: loading ? 0.7 : 1,
            transition: "background 200ms var(--ease)",
          }}
          onMouseEnter={(e) => {
            if (!loading) e.currentTarget.style.background = "var(--accent-hover)";
          }}
          onMouseLeave={(e) => {
            if (!loading) e.currentTarget.style.background = "var(--accent)";
          }}
        >
          {loading ? "One moment…" : isLogin ? "Sign in" : "Create free account"}
        </button>

        <div style={{ textAlign: "center", fontSize: 13, color: "var(--text-secondary)" }}>
          {isLogin ? (
            <>
              No account yet? <Link href="/register">Create one</Link>
            </>
          ) : (
            <>
              Already have an account? <Link href="/login">Sign in</Link>
            </>
          )}
        </div>
      </form>

      <Link href="/" style={{ fontSize: 13, color: "var(--text-secondary)" }}>
        ← Back to editor
      </Link>
    </div>
  );
}
