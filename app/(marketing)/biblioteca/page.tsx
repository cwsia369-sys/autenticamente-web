"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/app/providers/LangProvider";

/* ──────────────────────────────────────────────────────────
   Types
   ────────────────────────────────────────────────────────── */
type Category = "todos" | "ebooks" | "meditaciones" | "masterclasses" | "workbooks";
type TierKey  = "despertar" | "circulo" | "verdad";

interface ProductData {
  id: number;
  slug: string;
  category: Category;
  type: string;
  title: string;
  subtitle: string;
  desc: string;
  tier: TierKey;
  img: string;
  badgeKey: string | null;
}

/* ──────────────────────────────────────────────────────────
   Tier config — single source of truth for the 3 membership tiers
   Must stay in sync with /membresia
   ────────────────────────────────────────────────────────── */
const TIER_CONFIG: Record<TierKey, { labelEs: string; labelEn: string; priceEs: string; priceEn: string; color: string; bg: string }> = {
  despertar: {
    labelEs: "Despertar",
    labelEn: "Awaken",
    priceEs: "$19 / mes",
    priceEn: "$19 / mo",
    color:   "#928178",
    bg:      "rgba(146,129,120,0.14)",
  },
  circulo: {
    labelEs: "Círculo",
    labelEn: "Circle",
    priceEs: "$49 / mes",
    priceEn: "$49 / mo",
    color:   "#54132B",
    bg:      "rgba(84,19,43,0.18)",
  },
  verdad: {
    labelEs: "Verdad",
    labelEn: "Truth",
    priceEs: "$99 / mes",
    priceEn: "$99 / mo",
    color:   "#F4E7E9",
    bg:      "rgba(244,231,233,0.12)",
  },
};

/* ──────────────────────────────────────────────────────────
   Format label per category (for the small chip top-right)
   ────────────────────────────────────────────────────────── */
const FORMAT_LABEL: Partial<Record<Category, string>> = {
  ebooks:        "PDF",
  meditaciones:  "Audio",
  masterclasses: "Video",
  workbooks:     "PDF",
};

const CAT_COLOR: Record<Category, string> = {
  todos:         "#54132B",
  ebooks:        "#54132B",
  meditaciones:  "#425546",
  masterclasses: "#C79C8C",
  workbooks:     "#928178",
};

const CATEGORIES: { key: Category; labelKey: string }[] = [
  { key: "todos",         labelKey: "biblio.cat.todos"        },
  { key: "ebooks",        labelKey: "biblio.cat.ebooks"       },
  { key: "meditaciones",  labelKey: "biblio.cat.meditaciones" },
  { key: "masterclasses", labelKey: "biblio.cat.masterclasses"},
  { key: "workbooks",     labelKey: "biblio.cat.workbooks"    },
];

/* ──────────────────────────────────────────────────────────
   Products — each assigned to a tier
   ────────────────────────────────────────────────────────── */
const PRODUCTS_ES: ProductData[] = [
  {
    id: 1, slug: "sanar-desde-dentro",
    category: "ebooks", type: "Ebook",
    title:    "Sanar desde dentro",
    subtitle: "Guía para el autodescubrimiento",
    desc:     "Un viaje profundo hacia tu interior para reconciliarte con tu pasado y florecer.",
    tier: "circulo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Qb-OFiqcM08p3C38Y9HOMv2GvINF4W-LqYhwjCq4JEaAp-QJnIayHKbe934OD9mFmFWEuBXzqxxc9a_ePa2dn9k7Ztf9gIyFt1YEZ3GWoHlSZmUIdz3zLMjeSeot2SpNJC0r4ev1jk1gkU2nWwjT3e18NB4Kbx0nqEykF9u-MYFYmHjxNySD7zVQtwbcxDwQ_l2H1LJJNFXwebx9JUFTP7tOe4KJDQGDUMC6YuAmmNjpdEmnMhIWv3mFzn4GK2bjV8QTc8XAcvk",
    badgeKey: "biblio.badge.bestseller",
  },
  {
    id: 2, slug: "regulacion-emocional",
    category: "meditaciones", type: "Meditación",
    title:    "Regulación emocional",
    subtitle: "Calma en medio del caos",
    desc:     "Audio guiado de 20 minutos con técnicas de respiración consciente.",
    tier: "despertar",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXw35Jn-1eA4JCdFFRy7U85TvOXxxO3ERcciy_Wpt7J9Tjho_L6F3Xz_9qkRimnfMOIZhRzzolF-1fDgFrR5Ts1opJ94hAz0Hl7htR7UqDpfg7hkC1J0R0eVURJHwnSkp9ar2Fu_hMTS7L5crQ5b6fTW7Djyq9pFlVI-j5SEY7sJYBPnaADXjEy-nzqx9tAVP34vH2L8A7kxYUOqwnNK5tgQ2nD-Lvw0N0fg2_SVCcFpIjLNPQuThVmfyDObyllUcIOGAzS-335eo",
    badgeKey: null,
  },
  {
    id: 3, slug: "reconstruccion-interior",
    category: "workbooks", type: "Workbook",
    title:    "Reconstrucción interior",
    subtitle: "Cuaderno de ejercicios",
    desc:     "50 páginas de dinámicas prácticas para fortalecer tu autoestima y autoconocimiento.",
    tier: "circulo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSiFY03CGEI_1Te46hNJbQa7zLKJyqfJThKcZzfhg3bxan13OBvNwD1v4IF80oMa1l5JV-Bi4Z7ku17ffqrv6z6N7P5LX6DCHQQhP3hPGgrsfndslpJxseu5fdUdj8_yqiXsKzcEsGHlv4eJP6w3iuFT9QZ-OdUAKt9g6WA9RqXuy_Dgtgi0ojBuJCrE_03lD-XDRsMEvgvqmyDk0K7oUK7CsvOXUBYizFqX0W7mATEuI1zhIrY9drcR3PrTyny-bNZ4KiIF99Nvw",
    badgeKey: null,
  },
  {
    id: 4, slug: "limites-saludables",
    category: "masterclasses", type: "Masterclass",
    title:    "Límites saludables en las relaciones",
    subtitle: "Sesión en video",
    desc:     "90 minutos para aprender a decir 'no' sin culpa y establecer vínculos desde la plenitud.",
    tier: "verdad",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbWF5xhQxRVlBDTajhpRtVfBWib9CyT2vlgF5YO4HYZ8-b76E00XEOWROtj19_YJ0UBa_SJZa9ikeAQRwgRkW1MBsM5j6S4soT-trEydhxW7JeyPfNQxUNBkQ5KbxDfRNiDFBYfsKl-AfbcDS5kGD9yYwQ6YL_u9UpGX5Yzwyt9ppzij5PMET_h8vMktn0DKWNaTuZ_qq5nd98Tw78yrbm7pbZNqygJySUMSG90JqkEhMXCCczic0ThrNrnquJoIj-60zXGKsbOFM",
    badgeKey: "biblio.badge.new",
  },
  {
    id: 5, slug: "la-mujer-que-olvido-su-nombre",
    category: "ebooks", type: "Ebook",
    title:    "La mujer que olvidó su nombre",
    subtitle: "Identidad y reconexión",
    desc:     "Una guía literaria y terapéutica para reencontrar tu verdad interior después de perderte.",
    tier: "circulo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdZJYReRdCjjkZ-YzgjCz1mz4cvfCNwI8186BrI89VFdEJA14ASbSeLumdNkTjkdSpFZ-KyrnqhqVzHkAgoSIUJ_eIiJIWlWlcslO8GR6vEN-hiTNrqO2cuXfnICg6QDxvTdHoQap0koXofc1N6OGpb40MKGX9ePGH8Hg1r2uaYbTlp6p3wOejT7V6Vx26XqEQbx4ZZrSWKTFWXNendarq2agTo-7tDL2JFJfFv775ZKOIMv_m3rrLAZhU_WPhzXMjdu5jfDOVdPk",
    badgeKey: null,
  },
  {
    id: 6, slug: "conciencia-sin-ruido",
    category: "meditaciones", type: "Meditación",
    title:    "Conciencia sin ruido",
    subtitle: "Serie de 5 audios",
    desc:     "Práctica diaria de 10 minutos para cultivar presencia plena en medio del caos cotidiano.",
    tier: "despertar",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyQqLuTF4-mPYaYy3Hm1A4CniiksqdkoUE-rawcga2S-oshBAibHFhFpNKI4K9jhxfI8QFhpvtURJfbW0-TNcc1ZExDH5IyF_m0Fjefy_ogg9rGhsObdP3qntaAjoKEEs6RbZKbNOMaizh4zdPz1qjr9iEFWyt07gXlaC3--OqXWYRhSDywIKBChvcsD46WoTI4IiEFs2Q2jjk52OCIhUhMagw6bt3UKN6pvMVlOa4Ihpr9pO5WinjeTYmQDq4A8yuKt4QtxyeAqA",
    badgeKey: null,
  },
];

const PRODUCTS_EN: ProductData[] = [
  {
    id: 1, slug: "sanar-desde-dentro",
    category: "ebooks", type: "Ebook",
    title:    "Healing from Within",
    subtitle: "A guide to self-discovery",
    desc:     "A deep journey inward to reconcile with your past and flourish.",
    tier: "circulo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Qb-OFiqcM08p3C38Y9HOMv2GvINF4W-LqYhwjCq4JEaAp-QJnIayHKbe934OD9mFmFWEuBXzqxxc9a_ePa2dn9k7Ztf9gIyFt1YEZ3GWoHlSZmUIdz3zLMjeSeot2SpNJC0r4ev1jk1gkU2nWwjT3e18NB4Kbx0nqEykF9u-MYFYmHjxNySD7zVQtwbcxDwQ_l2H1LJJNFXwebx9JUFTP7tOe4KJDQGDUMC6YuAmmNjpdEmnMhIWv3mFzn4GK2bjV8QTc8XAcvk",
    badgeKey: "biblio.badge.bestseller",
  },
  {
    id: 2, slug: "regulacion-emocional",
    category: "meditaciones", type: "Meditation",
    title:    "Emotional Regulation",
    subtitle: "Calm in the midst of chaos",
    desc:     "20-minute guided audio with conscious breathing techniques.",
    tier: "despertar",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCXw35Jn-1eA4JCdFFRy7U85TvOXxxO3ERcciy_Wpt7J9Tjho_L6F3Xz_9qkRimnfMOIZhRzzolF-1fDgFrR5Ts1opJ94hAz0Hl7htR7UqDpfg7hkC1J0R0eVURJHwnSkp9ar2Fu_hMTS7L5crQ5b6fTW7Djyq9pFlVI-j5SEY7sJYBPnaADXjEy-nzqx9tAVP34vH2L8A7kxYUOqwnNK5tgQ2nD-Lvw0N0fg2_SVCcFpIjLNPQuThVmfyDObyllUcIOGAzS-335eo",
    badgeKey: null,
  },
  {
    id: 3, slug: "reconstruccion-interior",
    category: "workbooks", type: "Workbook",
    title:    "Inner Reconstruction",
    subtitle: "Exercise notebook",
    desc:     "50 pages of practical exercises to strengthen your self-esteem and self-knowledge.",
    tier: "circulo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSiFY03CGEI_1Te46hNJbQa7zLKJyqfJThKcZzfhg3bxan13OBvNwD1v4IF80oMa1l5JV-Bi4Z7ku17ffqrv6z6N7P5LX6DCHQQhP3hPGgrsfndslpJxseu5fdUdj8_yqiXsKzcEsGHlv4eJP6w3iuFT9QZ-OdUAKt9g6WA9RqXuy_Dgtgi0ojBuJCrE_03lD-XDRsMEvgvqmyDk0K7oUK7CsvOXUBYizFqX0W7mATEuI1zhIrY9drcR3PrTyny-bNZ4KiIF99Nvw",
    badgeKey: null,
  },
  {
    id: 4, slug: "limites-saludables",
    category: "masterclasses", type: "Masterclass",
    title:    "Healthy Boundaries in Relationships",
    subtitle: "Video session",
    desc:     "90 minutes to learn to say no without guilt and build connections from wholeness.",
    tier: "verdad",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbWF5xhQxRVlBDTajhpRtVfBWib9CyT2vlgF5YO4HYZ8-b76E00XEOWROtj19_YJ0UBa_SJZa9ikeAQRwgRkW1MBsM5j6S4soT-trEydhxW7JeyPfNQxUNBkQ5KbxDfRNiDFBYfsKl-AfbcDS5kGD9yYwQ6YL_u9UpGX5Yzwyt9ppzij5PMET_h8vMktn0DKWNaTuZ_qq5nd98Tw78yrbm7pbZNqygJySUMSG90JqkEhMXCCczic0ThrNrnquJoIj-60zXGKsbOFM",
    badgeKey: "biblio.badge.new",
  },
  {
    id: 5, slug: "la-mujer-que-olvido-su-nombre",
    category: "ebooks", type: "Ebook",
    title:    "The Woman Who Forgot Her Name",
    subtitle: "Identity and reconnection",
    desc:     "A literary and therapeutic guide to rediscover your inner truth after losing yourself.",
    tier: "circulo",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdZJYReRdCjjkZ-YzgjCz1mz4cvfCNwI8186BrI89VFdEJA14ASbSeLumdNkTjkdSpFZ-KyrnqhqVzHkAgoSIUJ_eIiJIWlWlcslO8GR6vEN-hiTNrqO2cuXfnICg6QDxvTdHoQap0koXofc1N6OGpb40MKGX9ePGH8Hg1r2uaYbTlp6p3wOejT7V6Vx26XqEQbx4ZZrSWKTFWXNendarq2agTo-7tDL2JFJfFv775ZKOIMv_m3rrLAZhU_WPhzXMjdu5jfDOVdPk",
    badgeKey: null,
  },
  {
    id: 6, slug: "conciencia-sin-ruido",
    category: "meditaciones", type: "Meditation",
    title:    "Consciousness Without Noise",
    subtitle: "Series of 5 audios",
    desc:     "Daily 10-minute practice to cultivate full presence amid everyday chaos.",
    tier: "despertar",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyQqLuTF4-mPYaYy3Hm1A4CniiksqdkoUE-rawcga2S-oshBAibHFhFpNKI4K9jhxfI8QFhpvtURJfbW0-TNcc1ZExDH5IyF_m0Fjefy_ogg9rGhsObdP3qntaAjoKEEs6RbZKbNOMaizh4zdPz1qjr9iEFWyt07gXlaC3--OqXWYRhSDywIKBChvcsD46WoTI4IiEFs2Q2jjk52OCIhUhMagw6bt3UKN6pvMVlOa4Ihpr9pO5WinjeTYmQDq4A8yuKt4QtxyeAqA",
    badgeKey: null,
  },
];

/* ──────────────────────────────────────────────────────────
   ProductCard — tier-gated, no individual prices
   ────────────────────────────────────────────────────────── */
function ProductCard({
  product,
  badgeLabel,
  lang,
}: {
  product:    ProductData;
  badgeLabel: string | null;
  lang:       string;
}) {
  const [hovered, setHovered] = useState(false);
  const format   = FORMAT_LABEL[product.category] ?? null;
  const catColor = CAT_COLOR[product.category];
  const tierCfg  = TIER_CONFIG[product.tier];
  const tierName = lang === "es" ? tierCfg.labelEs : tierCfg.labelEn;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position:        "relative",
        backgroundColor: "#111111",
        borderRadius:    "3px",
        overflow:        "hidden",
        display:         "flex",
        flexDirection:   "column",
        transition:      "box-shadow 0.35s ease, transform 0.35s ease",
        boxShadow:       hovered
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px ${catColor}55`
          : "0 4px 20px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.05)",
        transform:       hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden", flexShrink: 0 }}>
        <Image
          src={product.img}
          alt={`${product.type}: ${product.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
          style={{ objectFit: "cover", transition: "transform 0.6s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
          unoptimized
        />
        {/* Gradient overlay bottom */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)" }} />

        {/* Category accent line — top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", backgroundColor: catColor }} />

        {/* Format chip (top right) */}
        {format && (
          <span style={{
            position:        "absolute",
            top:             "14px",
            right:           "14px",
            fontSize:        "9px",
            fontFamily:      "var(--font-am-body)",
            fontWeight:      700,
            letterSpacing:   "0.2em",
            textTransform:   "uppercase",
            padding:         "4px 10px",
            backgroundColor: "rgba(0,0,0,0.6)",
            color:           "#FFFFFF",
            borderRadius:    "2px",
            backdropFilter:  "blur(8px)",
            border:          "1px solid rgba(255,255,255,0.12)",
          }}>
            {format}
          </span>
        )}

        {/* Highlight badge (top left) */}
        {badgeLabel && (
          <span style={{
            position:        "absolute",
            top:             "14px",
            left:            "14px",
            fontSize:        "9px",
            fontFamily:      "var(--font-am-body)",
            fontWeight:      700,
            letterSpacing:   "0.14em",
            textTransform:   "uppercase",
            padding:         "4px 10px",
            backgroundColor: catColor,
            color:           "#FFFFFF",
            borderRadius:    "2px",
          }}>
            {badgeLabel}
          </span>
        )}

        {/* Title overlay on image */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "18px 20px 16px" }}>
          <p style={{ fontSize: "9px", fontFamily: "var(--font-am-body)", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: catColor, marginBottom: "5px" }}>
            {product.type}
          </p>
          <h3 style={{ fontSize: "clamp(16px, 1.8vw, 20px)", fontFamily: "var(--font-am-display)", fontWeight: 300, color: "#FFFFFF", lineHeight: 1.2, margin: 0 }}>
            {product.title}
          </h3>
        </div>
      </div>

      {/* ── Content below image ── */}
      <div style={{ padding: "18px 20px 20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        <p style={{ fontSize: "12px", fontFamily: "var(--font-am-display)", fontStyle: "italic", color: "rgba(255,255,255,0.45)", margin: 0 }}>
          {product.subtitle}
        </p>
        <p style={{ fontSize: "13px", fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0, flex: 1 }}>
          {product.desc}
        </p>

        <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.07)", margin: "4px 0" }} />

        {/* Tier badge + unlock CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
            {/* Lock icon */}
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flexShrink: 0, color: tierCfg.color }}>
              <rect x="3" y="6" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M5 6V4.5a2 2 0 0 1 4 0V6" stroke="currentColor" strokeWidth="1" />
            </svg>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  fontSize: "9px",
                  fontFamily: "var(--font-am-body)",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.1,
                }}
              >
                {lang === "es" ? "Incluido en" : "Included in"}
              </p>
              <p
                style={{
                  margin: "2px 0 0",
                  fontSize: "13px",
                  fontFamily: "var(--font-am-display)",
                  fontStyle: "italic",
                  color: tierCfg.color,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.1,
                }}
              >
                {tierName}
              </p>
            </div>
          </div>

          <Link
            href={`/membresia#tiers`}
            style={{
              flexShrink:      0,
              padding:         "10px 20px",
              backgroundColor: hovered ? tierCfg.color : "rgba(255,255,255,0.07)",
              color:           hovered && product.tier === "verdad" ? "#0A0A0A" : "#FFFFFF",
              border:          `1px solid ${hovered ? tierCfg.color : "rgba(255,255,255,0.12)"}`,
              borderRadius:    "100px",
              fontSize:        "10px",
              fontFamily:      "var(--font-am-body)",
              fontWeight:      700,
              letterSpacing:   "0.14em",
              textTransform:   "uppercase",
              cursor:          "pointer",
              transition:      "all 0.25s ease",
              textDecoration:  "none",
              display:         "inline-flex",
              alignItems:      "center",
              gap:             "6px",
            }}
            aria-label={`${lang === "es" ? "Desbloquear" : "Unlock"} — ${product.title}`}
          >
            {lang === "es" ? "Desbloquear" : "Unlock"}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </Link>
        </div>

        <p style={{ fontSize: "9.5px", fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.2)", letterSpacing: "0.14em", textTransform: "uppercase", textAlign: "center", margin: 0 }}>
          {lang === "es" ? "Acceso inmediato con tu membresía" : "Instant access with your membership"}
        </p>
      </div>
    </article>
  );
}

/* ══════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════ */
export default function BibliotecaPage() {
  const { lang, t } = useLang();
  const [active, setActive] = useState<Category>("todos");

  const allProducts = lang === "es" ? PRODUCTS_ES : PRODUCTS_EN;
  const filtered    = active === "todos" ? allProducts : allProducts.filter((p) => p.category === active);
  const activeColor = CAT_COLOR[active];

  // Count resources per tier for legend
  const tierCounts = {
    despertar: allProducts.filter(p => p.tier === "despertar").length,
    circulo:   allProducts.filter(p => p.tier === "circulo").length,
    verdad:    allProducts.filter(p => p.tier === "verdad").length,
  };

  return (
    <>
      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes gridFade {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .biblio-hero-text { animation: heroFade 0.8s ease both; }
        .biblio-grid      { animation: gridFade 0.5s ease both; }
      `}</style>

      <div style={{ backgroundColor: "#0A0A0A", color: "#FFFFFF", minHeight: "100vh" }}>

        {/* ══ HERO ══ */}
        <section style={{ position: "relative", overflow: "hidden", padding: "clamp(80px,10vw,130px) 24px clamp(60px,7vw,100px)" }}>
          {/* GeoLayer */}
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0 }} preserveAspectRatio="xMidYMid slice">
              <rect x="5%" y="8%" width="90%" height="84%" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <rect x="14%" y="20%" width="72%" height="60%" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.8"/>
              <line x1="5%" y1="8%" x2="5%" y2="92%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <line x1="95%" y1="8%" x2="95%" y2="92%" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <rect x="5%" y="8%" width="16%" height="20%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <rect x="79%" y="72%" width="16%" height="20%" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
            </svg>
          </div>

          <div className="max-w-[1100px] mx-auto" style={{ position: "relative", zIndex: 1 }}>
            <div className="biblio-hero-text" style={{ textAlign: "center" }}>

              {/* Eyebrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "28px" }}>
                <span style={{ display: "inline-block", width: "40px", height: "1px", backgroundColor: "#54132B" }} />
                <span style={{ fontSize: "10px", fontFamily: "var(--font-am-body)", fontWeight: 700, letterSpacing: "0.36em", textTransform: "uppercase", color: "#54132B" }}>
                  {lang === "es" ? "Incluido en tu membresía" : "Included in your membership"}
                </span>
                <span style={{ display: "inline-block", width: "40px", height: "1px", backgroundColor: "#54132B" }} />
              </div>

              {/* Main title — two lines, editorial */}
              <h1 style={{ margin: "0 0 24px", lineHeight: 0.92, letterSpacing: "-0.03em" }}>
                <span style={{ display: "block", fontSize: "clamp(48px, 8vw, 100px)", fontFamily: "var(--font-am-display)", fontWeight: 300, color: "#FFFFFF" }}>
                  {lang === "es" ? "Biblioteca" : "Library"}
                </span>
                <span style={{ display: "block", fontSize: "clamp(20px, 3vw, 38px)", fontFamily: "var(--font-am-display)", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,0.35)", marginTop: "8px", letterSpacing: "-0.01em" }}>
                  AuténticaMente®
                </span>
              </h1>

              <p style={{ fontSize: "clamp(14px,1.5vw,17px)", fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: "540px", margin: "0 auto 40px" }}>
                {lang === "es"
                  ? "Todo el contenido digital de AuténticaMente en un solo lugar. Cada recurso está incluido en una de las membresías — elige el tier que desbloquea lo que necesitas."
                  : "All of AuténticaMente's digital content in one place. Every resource is included in one of the memberships — choose the tier that unlocks what you need."}
              </p>

              {/* Tier legend */}
              <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px,3vw,36px)", flexWrap: "wrap", marginBottom: "8px" }}>
                {(Object.keys(TIER_CONFIG) as TierKey[]).map((key) => {
                  const cfg = TIER_CONFIG[key];
                  return (
                    <div key={key} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          display: "inline-block",
                          width: "10px",
                          height: "10px",
                          borderRadius: "50%",
                          backgroundColor: cfg.color,
                          boxShadow: `0 0 0 3px ${cfg.bg}`,
                        }}
                      />
                      <div style={{ textAlign: "left" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "11px",
                            fontFamily: "var(--font-am-display)",
                            fontStyle: "italic",
                            color: "#FFFFFF",
                            lineHeight: 1.1,
                          }}
                        >
                          {lang === "es" ? cfg.labelEs : cfg.labelEn}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "9px",
                            fontFamily: "var(--font-am-body)",
                            color: "rgba(255,255,255,0.3)",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                          }}
                        >
                          {tierCounts[key]} {lang === "es" ? "recursos" : "resources"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ══ FILTER BAR ══ */}
        <nav
          aria-label={lang === "es" ? "Filtros de categoría" : "Category filters"}
          style={{
            position:        "sticky",
            top:             "72px",
            zIndex:          40,
            backgroundColor: "rgba(10,10,10,0.95)",
            backdropFilter:  "blur(20px)",
            borderBottom:    "1px solid rgba(255,255,255,0.07)",
            padding:         "0 24px",
          }}
        >
          <div className="max-w-[1100px] mx-auto" style={{ display: "flex", gap: "2px", overflowX: "auto", padding: "12px 0" }}>
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.key;
              const cc = CAT_COLOR[cat.key];
              return (
                <button
                  key={cat.key}
                  onClick={() => setActive(cat.key)}
                  aria-pressed={isActive}
                  style={{
                    flexShrink:      0,
                    padding:         "8px 20px",
                    fontSize:        "10px",
                    fontFamily:      "var(--font-am-body)",
                    fontWeight:      700,
                    letterSpacing:   "0.18em",
                    textTransform:   "uppercase",
                    border:          "none",
                    borderRadius:    "2px",
                    cursor:          "pointer",
                    transition:      "all 0.22s ease",
                    backgroundColor: isActive ? cc : "transparent",
                    color:           isActive ? "#FFFFFF" : "rgba(255,255,255,0.35)",
                    outline:         isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {t(cat.labelKey)}
                </button>
              );
            })}
          </div>
          <div style={{ height: "1px", backgroundColor: activeColor, transition: "background-color 0.4s ease", marginTop: "-1px" }} />
        </nav>

        {/* ══ GRID ══ */}
        <section
          aria-label={lang === "es" ? "Recursos digitales" : "Digital resources"}
          style={{ padding: "60px 24px 80px" }}
        >
          <div className="max-w-[1100px] mx-auto">
            {/* Count + active category */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "36px" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                {filtered.length} {lang === "es" ? "recursos" : "resources"}
              </span>
              {active !== "todos" && (
                <>
                  <span style={{ width: "1px", height: "12px", backgroundColor: "rgba(255,255,255,0.12)", display: "inline-block" }} />
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-am-body)", color: activeColor, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600 }}>
                    {t(`biblio.cat.${active}`)}
                  </span>
                </>
              )}
            </div>

            <div
              className="biblio-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}
            >
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  badgeLabel={product.badgeKey ? t(product.badgeKey) : null}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ══ MEMBERSHIP MODEL EXPLAINER ══ */}
        <section style={{ position: "relative", padding: "clamp(80px,10vw,120px) 24px" }}>
          <div className="max-w-[900px] mx-auto" style={{ textAlign: "center" }}>
            <p style={{ fontSize: "10px", fontFamily: "var(--font-am-body)", fontWeight: 700, letterSpacing: "0.36em", textTransform: "uppercase", color: "rgba(122,32,64,0.85)", marginBottom: "20px" }}>
              {lang === "es" ? "Cómo funciona" : "How it works"}
            </p>
            <h2
              style={{
                fontSize: "clamp(32px,5vw,56px)",
                fontFamily: "var(--font-am-display)",
                fontWeight: 300,
                color: "#FFFFFF",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                marginBottom: "20px",
              }}
            >
              {lang === "es" ? (
                <>Una membresía.<br /><span style={{ fontStyle: "italic", color: "#7A2040" }}>Todo el contenido.</span></>
              ) : (
                <>One membership.<br /><span style={{ fontStyle: "italic", color: "#7A2040" }}>All the content.</span></>
              )}
            </h2>
            <p style={{ fontSize: "clamp(14px,1.4vw,17px)", fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "640px", margin: "0 auto 36px" }}>
              {lang === "es"
                ? "Elige el tier que se adapta a tu momento. Si quieres más profundidad, haz upgrade en cualquier momento y desbloqueas todo el contenido del siguiente nivel al instante."
                : "Choose the tier that fits your moment. If you want more depth, upgrade anytime and unlock all of the next level's content instantly."}
            </p>

            {/* 3 tier mini-cards */}
            <div style={{ display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "48px", maxWidth: "760px", marginLeft: "auto", marginRight: "auto" }}>
              {(Object.keys(TIER_CONFIG) as TierKey[]).map((key) => {
                const cfg = TIER_CONFIG[key];
                return (
                  <div
                    key={key}
                    style={{
                      padding: "22px 20px",
                      backgroundColor: "#111111",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "3px",
                      textAlign: "left",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: "22px",
                        fontFamily: "var(--font-am-display)",
                        fontStyle: "italic",
                        fontWeight: 300,
                        color: cfg.color,
                        letterSpacing: "-0.01em",
                        lineHeight: 1,
                      }}
                    >
                      {lang === "es" ? cfg.labelEs : cfg.labelEn}
                    </p>
                    <p
                      style={{
                        margin: "6px 0 12px",
                        fontSize: "11px",
                        fontFamily: "var(--font-am-body)",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                      }}
                    >
                      {lang === "es" ? cfg.priceEs : cfg.priceEn}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "11px",
                        fontFamily: "var(--font-am-body)",
                        color: "rgba(255,255,255,0.45)",
                        lineHeight: 1.5,
                      }}
                    >
                      {tierCounts[key]} {lang === "es" ? "recursos en biblioteca" : "library resources"}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA row */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
              <Link
                href="/membresia#tiers"
                style={{
                  display:         "inline-flex",
                  alignItems:      "center",
                  gap:             "8px",
                  padding:         "16px 44px",
                  backgroundColor: "#F9F4F1",
                  color:           "#0A0A0A",
                  borderRadius:    "100px",
                  fontSize:        "13px",
                  fontFamily:      "var(--font-am-body)",
                  fontWeight:      600,
                  letterSpacing:   "0.04em",
                  textDecoration:  "none",
                  transition:      "transform 0.3s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
              >
                {lang === "es" ? "Ver las 3 membresías" : "View the 3 memberships"}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 3L9.5 7L5.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <p style={{ fontSize: "11px", fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.28)", letterSpacing: "0.1em" }}>
                {lang === "es" ? "Desde $19/mes · Cancela cuando quieras" : "From $19/mo · Cancel anytime"}
              </p>
            </div>
          </div>
        </section>

        {/* ══ TRUST STRIP ══ */}
        <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "32px 24px" }}>
          <div className="max-w-[1100px] mx-auto" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "32px 48px" }}>
            {[
              { label: lang === "es" ? "Incluido en membresía" : "Included in membership" },
              { label: lang === "es" ? "Acceso inmediato" : "Instant access" },
              { label: lang === "es" ? "Todos los dispositivos" : "All devices" },
              { label: lang === "es" ? "Cancela cuando quieras" : "Cancel anytime" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ display: "inline-block", width: "4px", height: "4px", borderRadius: "50%", backgroundColor: "#54132B" }} />
                <span style={{ fontSize: "11px", fontFamily: "var(--font-am-body)", color: "rgba(255,255,255,0.3)", letterSpacing: "0.14em", textTransform: "uppercase" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
