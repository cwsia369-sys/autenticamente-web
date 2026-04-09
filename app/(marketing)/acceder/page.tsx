"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/app/providers/LangProvider";

export default function AccederPage() {
  const { lang } = useLang();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#F9F4F1" }}>

      {/* ── LEFT PANEL — Brand editorial ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "42%",
          flexShrink: 0,
          backgroundColor: "#54132B",
          position: "relative",
          overflow: "hidden",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "48px 52px",
        }}
      >
        {/* Geo rectangles decoration */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
            <rect x="6%" y="6%" width="88%" height="88%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            <rect x="14%" y="14%" width="72%" height="72%" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
            <rect x="6%" y="6%" width="22%" height="22%" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
            <rect x="72%" y="72%" width="22%" height="22%" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
          </svg>
        </div>

        {/* Large "m" watermark */}
        <div style={{ position: "absolute", bottom: "-6%", right: "-8%", width: "72%", height: "72%", opacity: 0.07, pointerEvents: "none" }}>
          <Image src="/logos/am-icon-white.svg" alt="" fill style={{ objectFit: "contain", objectPosition: "bottom right" }} />
        </div>

        {/* Top: logo */}
        <Link href="/">
          <Image
            src="/logos/am-wordmark-white.svg"
            alt="AuténticaMente"
            width={160}
            height={40}
            style={{ height: "22px", width: "auto", opacity: 0.85 }}
          />
        </Link>

        {/* Center: editorial quote */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 0" }}>
          <div style={{ width: "32px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)", marginBottom: "28px" }} />
          <blockquote style={{
            fontFamily: "var(--font-am-display)",
            fontSize: "clamp(28px,3vw,42px)",
            fontWeight: 300,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: "#FFFFFF",
            marginBottom: "28px",
          }}>
            {lang === "es"
              ? "\"Volverte a ti no es un destino. Es una práctica diaria.\""
              : "\"Returning to yourself isn't a destination. It's a daily practice.\""}
          </blockquote>
          <p style={{
            fontFamily: "var(--font-am-body)",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.35)",
          }}>
            — Dra. Liset Valencia
          </p>
        </div>

        {/* Bottom: tagline */}
        <p style={{
          fontFamily: "var(--font-am-body)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.25)",
          letterSpacing: "0.06em",
          lineHeight: 1.6,
        }}>
          {lang === "es"
            ? "Plataforma de desarrollo humano · Conferencias · Masterclasses · Comunidad"
            : "Human development platform · Conferences · Masterclasses · Community"}
        </p>
      </div>

      {/* ── RIGHT PANEL — Auth form ── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(40px,6vw,80px) clamp(24px,6vw,80px)",
        position: "relative",
      }}>

        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link href="/">
            <Image
              src="/logos/am-wordmark-burgundy.svg"
              alt="AuténticaMente"
              width={140}
              height={36}
              style={{ height: "20px", width: "auto" }}
            />
          </Link>
        </div>

        <div style={{ width: "100%", maxWidth: "420px" }}>

          {/* Title */}
          <div style={{ marginBottom: "36px" }}>
            <h1 style={{
              fontFamily: "var(--font-am-display)",
              fontSize: "clamp(26px,3vw,36px)",
              fontWeight: 300,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              color: "#000000",
              lineHeight: 1.1,
              marginBottom: "10px",
            }}>
              {mode === "login"
                ? (lang === "es"
                    ? <>Bienvenid<span style={{ color: "#54132B" }}>@</span> de vuelta.</>
                    : "Welcome back.")
                : (lang === "es"
                    ? <>Crea tu cuenta<span style={{ color: "#54132B" }}>.</span></>
                    : "Create your account.")}
            </h1>
            <p style={{
              fontFamily: "var(--font-am-body)",
              fontSize: "13.5px",
              color: "#928178",
              lineHeight: 1.6,
            }}>
              {mode === "login"
                ? (lang === "es" ? "Accede a tus recursos, masterclasses y comunidad." : "Access your resources, masterclasses and community.")
                : (lang === "es" ? "Únete a miles de personas en proceso de transformación." : "Join thousands of people in transformation.")}
            </p>
          </div>

          {/* Social auth buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>

            {/* Google */}
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "13px 20px",
                borderRadius: "2px",
                border: "1px solid rgba(0,0,0,0.14)",
                backgroundColor: "#FFFFFF",
                cursor: "pointer",
                fontFamily: "var(--font-am-body)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#000000",
                letterSpacing: "0.01em",
                transition: "border-color 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.28)";
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Google icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              {lang === "es" ? "Continuar con Google" : "Continue with Google"}
            </button>

            {/* Apple */}
            <button
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                padding: "13px 20px",
                borderRadius: "2px",
                border: "1px solid #000000",
                backgroundColor: "#000000",
                cursor: "pointer",
                fontFamily: "var(--font-am-body)",
                fontSize: "13px",
                fontWeight: 500,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {/* Apple icon */}
              <svg width="16" height="18" viewBox="0 0 814 1000" fill="white">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663.5 0 541.8c0-207.6 131.4-317.3 260.8-317.3 67.2 0 123.1 44.5 164.7 44.5 40.2 0 103.1-47.2 178.3-47.2zM518.7 95.1c32.2-38.2 55.3-91.7 55.3-145.1 0-7.7-.6-15.4-1.9-22.5-52.6 2-114.7 35.3-152.2 75.8-29.5 32.8-56.3 86.3-56.3 140.4 0 8.3 1.3 16.6 1.9 19.2 3.2.6 8.3 1.3 13.4 1.3 47.2 0 106.8-31.6 139.8-69.1z"/>
              </svg>
              {lang === "es" ? "Continuar con Apple" : "Continue with Apple"}
            </button>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.1)" }} />
            <span style={{
              fontFamily: "var(--font-am-body)",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.3)",
            }}>
              {lang === "es" ? "o con tu correo" : "or with email"}
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "rgba(0,0,0,0.1)" }} />
          </div>

          {/* Email + password form */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === "es" ? "tu@correo.com" : "your@email.com"}
              style={{
                width: "100%",
                padding: "13px 16px",
                borderRadius: "2px",
                border: "1px solid rgba(0,0,0,0.14)",
                backgroundColor: "#FFFFFF",
                fontFamily: "var(--font-am-body)",
                fontSize: "13.5px",
                color: "#000000",
                outline: "none",
                transition: "border-color 0.2s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#54132B")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)")}
            />
            <div style={{ position: "relative" }}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={lang === "es" ? "Contraseña" : "Password"}
                style={{
                  width: "100%",
                  padding: "13px 16px",
                  borderRadius: "2px",
                  border: "1px solid rgba(0,0,0,0.14)",
                  backgroundColor: "#FFFFFF",
                  fontFamily: "var(--font-am-body)",
                  fontSize: "13.5px",
                  color: "#000000",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#54132B")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)")}
              />
            </div>
          </div>

          {/* Forgot password */}
          {mode === "login" && (
            <div style={{ textAlign: "right", marginBottom: "20px" }}>
              <button style={{
                fontFamily: "var(--font-am-body)", fontSize: "12px",
                color: "#928178", background: "none", border: "none",
                cursor: "pointer", letterSpacing: "0.02em",
              }}>
                {lang === "es" ? "¿Olvidaste tu contraseña?" : "Forgot your password?"}
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            style={{
              width: "100%",
              padding: "14px 20px",
              borderRadius: "2px",
              border: "none",
              backgroundColor: "#54132B",
              color: "#FFFFFF",
              fontFamily: "var(--font-am-body)",
              fontSize: "11.5px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              marginBottom: "24px",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {mode === "login"
              ? (lang === "es" ? "Iniciar sesión" : "Sign in")
              : (lang === "es" ? "Crear mi cuenta" : "Create account")}
          </button>

          {/* Toggle mode */}
          <p style={{
            fontFamily: "var(--font-am-body)",
            fontSize: "13px",
            color: "#928178",
            textAlign: "center",
            lineHeight: 1.6,
          }}>
            {mode === "login"
              ? (lang === "es" ? "¿No tienes una cuenta? " : "Don't have an account? ")
              : (lang === "es" ? "¿Ya tienes una cuenta? " : "Already have an account? ")}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              style={{
                fontFamily: "var(--font-am-body)",
                fontSize: "13px",
                fontWeight: 700,
                color: "#54132B",
                background: "none",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                padding: 0,
              }}
            >
              {mode === "login"
                ? (lang === "es" ? "Crear cuenta" : "Create account")
                : (lang === "es" ? "Iniciar sesión" : "Sign in")}
            </button>
          </p>

          {/* Legal */}
          <p style={{
            fontFamily: "var(--font-am-body)",
            fontSize: "10.5px",
            color: "rgba(0,0,0,0.25)",
            textAlign: "center",
            marginTop: "28px",
            lineHeight: 1.7,
          }}>
            {lang === "es"
              ? <>Al continuar aceptas nuestros{" "}<Link href="/terminos" style={{ color: "#928178" }}>Términos de servicio</Link>{" "}y{" "}<Link href="/privacidad" style={{ color: "#928178" }}>Política de privacidad</Link>.</>
              : <>By continuing you accept our{" "}<Link href="/terminos" style={{ color: "#928178" }}>Terms of service</Link>{" "}and{" "}<Link href="/privacidad" style={{ color: "#928178" }}>Privacy policy</Link>.</>}
          </p>
        </div>
      </div>
    </div>
  );
}
