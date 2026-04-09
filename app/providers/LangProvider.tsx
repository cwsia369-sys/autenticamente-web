"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "es" | "en";

const trans: Record<Lang, Record<string, string>> = {
  /* ══════════════════════════════════════════════════════════
     ESPAÑOL
  ══════════════════════════════════════════════════════════ */
  es: {
    /* ── Navbar ──────────────────────────────────────────── */
    "nav.metodo":        "El Método",
    "nav.programas":     "Programas",
    "nav.conferencias":  "Conferencias",
    "nav.podcast":       "Podcast",
    "nav.test":          "Test Emocional",
    "nav.biblioteca":    "Biblioteca",
    "nav.sobre":         "Sobre Liset",
    "nav.acceder":       "Acceder",
    "nav.comenzar":      "Comenzar",

    /* ── Home hero ───────────────────────────────────────── */
    "hero.eyebrow":      "Dra. Liset Valencia Medina presenta",
    "hero.subtitle":     "Centro de Transformación Psicoespiritual",
    "hero.body":         "Acompañamos a mujeres a salir del modo supervivencia emocional para reconectar con su conciencia, su propósito y su poder interior.",
    "hero.cta_primary":  "Comenzar mi proceso",
    "hero.cta_ghost":    "Hacer el test emocional",
    "hero.proof":        "Más de 200 mujeres han comenzado su proceso",
    "hero.tag":          "Psicóloga · Transformación · Conciencia",

    /* ── Home sections ───────────────────────────────────── */
    "home.quote":              "\"Muchas mujeres no están rotas. Están desconectadas.\"",
    "home.quote_sub":          "La ansiedad y el vacío existencial no son fallos de tu sistema, son señales de una desconexión profunda con tu ser interior.",
    "home.metodo_label":       "Metodología",
    "home.metodo_title":       "EL MÉTODO AUTÉNTICAMENTE",
    "home.metodo_sub":         "Un camino diseñado para transitar del caos a la claridad.",
    "home.programs_label":     "Propuesta de Valor",
    "home.programs_title":     "ESCALERA DE TRANSFORMACIÓN",
    "home.programs_sub":       "Programas diseñados para cada etapa de tu despertar y sanación.",
    "home.learn_more":         "Saber más",
    "home.test_title":         "¿En qué etapa de desconexión te encuentras hoy?",
    "home.test_sub":           "Realiza nuestro diagnóstico emocional gratuito y recibe una hoja de ruta personalizada para comenzar tu retorno a casa.",
    "home.test_cta":           "Hacer el test gratis",
    "home.testimonials_label": "Testimonios",
    "home.testimonials_title": "VOCES DE MUJERES QUE VOLVIERON A SÍ",

    /* ── Método page ─────────────────────────────────────── */
    "metodo.hero.label":       "Metodología",
    "metodo.hero.title":       "EL MÉTODO\nAUTÉNTICAMENTE",
    "metodo.hero.desc":        "Auténticamente integra psicología clínica, regulación emocional y conciencia espiritual. Un método que acompaña a las mujeres a entender sus emociones, sanar heridas relacionales y reconstruir su identidad desde la verdad interior.",
    "metodo.pillars.label":    "El Marco",
    "metodo.pillars.title":    "CUATRO FASES DE TRANSFORMACIÓN",
    "metodo.programs.label":   "Propuesta de Valor",
    "metodo.programs.title":   "ELIGE TU CAMINO",
    "metodo.programs.desc":    "Experiencias transformadoras diseñadas para tu etapa específica de evolución.",
    "metodo.solicitar":        "Solicitar información",
    "metodo.duracion":         "Duración",
    "metodo.formato":          "Formato",
    "metodo.precio":           "Precio",
    "metodo.incluye":          "Incluye",
    "metodo.cta.label":        "Membresía",
    "metodo.cta.title":        "¿No sabes por dónde empezar?",
    "metodo.cta.desc":         "Haz el test emocional gratuito y recibe una recomendación personalizada para tu próximo paso.",
    "metodo.cta.test":         "Hacer el test emocional",
    "metodo.cta.talk":         "Hablar con Liset",

    /* ── Sobre page ──────────────────────────────────────── */
    "sobre.label":             "Sobre Liset Valencia",
    "sobre.subtitle":          "Psicóloga clínica & Guía de transformación psicoespiritual",
    "sobre.desc":              "Acompañando procesos de despertar y sanación profunda a través de la integración del ser. Su misión es ayudar a las mujeres a reconectar con su conciencia para sanar desde lo más profundo.",
    "sobre.cta":               "Agendar consulta",
    "sobre.mision.label":      "Propósito · Misión",
    "sobre.mision.quote":      "\"Ayudar a las mujeres a reconectar con su conciencia para sanar desde lo más profundo, integrando la mente con el espíritu.\"",
    "sobre.historia.label":    "Mi Historia",
    "sobre.historia.title":    "UN VIAJE DE AUTODESCUBRIMIENTO",
    "sobre.historia.p1":       "Desde mis inicios en la psicología clínica convencional, sentí el llamado de ir más allá de los síntomas. Entendí que la psique y el espíritu son hilos de un mismo tejido que no pueden ser tratados por separado.",
    "sobre.historia.p2":       "Un viaje de autodescubrimiento y dedicación a la salud mental y espiritual que comenzó hace más de una década. Hoy, mi práctica es el resultado de años de formación académica y vivencias personales.",
    "sobre.historia.p3":       "Esas vivencias me han permitido desarrollar un método integral para el bienestar femenino — uno que honra tanto la ciencia como la profundidad del alma.",
    "sobre.valores.label":     "Nuestros Valores",
    "sobre.vision.label":      "Visión y Metodología",
    "sobre.vision.title":      "INTEGRANDO PSICOLOGÍA Y ESPIRITUALIDAD",
    "sobre.final.title":       "¿Estás lista para iniciar tu viaje de transformación?",
    "sobre.final.desc":        "Agenda hoy una consulta inicial y comienza el camino de regreso a tu verdadera esencia.",
    "sobre.final.cta":         "Agendar consulta",

    /* ── Biblioteca page ─────────────────────────────────── */
    "biblio.label":            "Recursos Digitales",
    "biblio.title":            "BIBLIOTECA AUTÉNTICAMENTE",
    "biblio.desc":             "Herramientas digitales diseñadas para acompañarte en tu viaje hacia una vida más plena, consciente y empoderada.",
    "biblio.cat.todos":        "Todos",
    "biblio.cat.ebooks":       "Ebooks",
    "biblio.cat.meditaciones": "Meditaciones",
    "biblio.cat.masterclasses":"Masterclasses",
    "biblio.cat.workbooks":    "Workbooks",
    "biblio.buy":              "Comprar",
    "biblio.payment":          "Pago 100% seguro y garantizado",
    "biblio.badge.bestseller": "Más vendido",
    "biblio.badge.new":        "Nuevo",

    /* ── Test page ───────────────────────────────────────── */
    "test.label":              "Diagnóstico Emocional Gratuito",
    "test.title":              "Cuestionario de Bienestar Interior",
    "test.desc":               "Un breve análisis para conectar con tu interior, identificar tus sombras y entender tus patrones actuales de comportamiento.",
    "test.profiles.label":     "Los 4 perfiles emocionales",
    "test.start":              "Iniciar test",
    "test.privacy":            "* Tus respuestas son anónimas y se utilizan únicamente para generar tu perfil emocional.",
    "test.question_of":        "de",
    "test.completed":          "% completado",
    "test.result.label":       "Tu perfil emocional",
    "test.result.rec_label":   "Recomendación personalizada",
    "test.result.rec_desc":    "Este programa está diseñado específicamente para acompañarte en tu etapa actual de proceso interior.",
    "test.result.know_prog":   "Conocer el programa",
    "test.result.retry":       "Repetir el test",
    "test.pregunta":           "Pregunta",

    /* ── Contacto page ───────────────────────────────────── */
    "contacto.label":          "Contacto",
    "contacto.title":          "Empieza tu proceso",
    "contacto.desc":           "Da el primer paso. Escríbenos y Liset o su equipo se pondrán en contacto contigo en menos de 48 horas.",
    "contacto.quote":          "\"Aquí no se trata de convertirte en alguien más. Se trata de recordar quién ya eres.\"",
    "contacto.quote_by":       "— Dra. Liset Valencia Medina",
    "contacto.nombre":         "Nombre completo",
    "contacto.nombre_ph":      "Tu nombre",
    "contacto.email":          "Correo electrónico",
    "contacto.email_ph":       "tu@correo.com",
    "contacto.mensaje":        "Mensaje",
    "contacto.mensaje_ph":     "¿Cómo podemos acompañarte?",
    "contacto.send":           "Enviar mensaje",
    "contacto.sent_title":     "Mensaje recibido.",
    "contacto.sent_desc":      "Gracias por escribirnos. Nos pondremos en contacto contigo en las próximas 48 horas.",

    /* ── Footer ──────────────────────────────────────────── */
    "footer.tagline":          "Acompañando a la mujer en su proceso de retorno a la esencia a través de la psicología profunda y la espiritualidad consciente.",
    "footer.credential":       "Dra. Liset Valencia Medina — Psicóloga Clínica",
    "footer.explorar":         "Explorar",
    "footer.legal":            "Legal",
    "footer.metodo":           "El Método",
    "footer.programas":        "Programas",
    "footer.test":             "Test Emocional",
    "footer.biblioteca":       "Biblioteca Digital",
    "footer.sobre":            "Sobre Liset",
    "footer.privacidad":       "Política de Privacidad",
    "footer.terminos":         "Términos de Uso",
    "footer.contacto":         "Contacto",
    "footer.copyright":        "Todos los derechos reservados.",
    "footer.instagram":        "Instagram",

    /* ── Assistant ───────────────────────────────────────── */
    "assistant.name":          "Asistente Auténticamente",
    "assistant.message":       "Hola, soy el asistente de Auténticamente. Estoy aquí para ayudarte a encontrar el programa adecuado para ti o agendar una consulta.",
    "assistant.test":          "Hacer el test emocional",
    "assistant.programs":      "Ver programas",
    "assistant.schedule":      "Agendar consulta",
    "assistant.whatsapp":      "Hablar por WhatsApp",
    "assistant.footer":        "AuténticaMente · Centro Psicoespiritual",
  },

  /* ══════════════════════════════════════════════════════════
     ENGLISH
  ══════════════════════════════════════════════════════════ */
  en: {
    /* ── Navbar ──────────────────────────────────────────── */
    "nav.metodo":        "The Method",
    "nav.programas":     "Programs",
    "nav.conferencias":  "Conferences",
    "nav.podcast":       "Podcast",
    "nav.test":          "Emotional Test",
    "nav.biblioteca":    "Library",
    "nav.sobre":         "About Liset",
    "nav.acceder":       "Sign In",
    "nav.comenzar":      "Begin",

    /* ── Home hero ───────────────────────────────────────── */
    "hero.eyebrow":      "Dr. Liset Valencia Medina presents",
    "hero.subtitle":     "Center for Psycho-Spiritual Transformation",
    "hero.body":         "We guide women out of emotional survival mode to reconnect with their consciousness, purpose, and inner power.",
    "hero.cta_primary":  "Begin my journey",
    "hero.cta_ghost":    "Take the emotional test",
    "hero.proof":        "Over 200 women have begun their journey",
    "hero.tag":          "Psychologist · Transformation · Consciousness",

    /* ── Home sections ───────────────────────────────────── */
    "home.quote":              "\"Many women are not broken. They are disconnected.\"",
    "home.quote_sub":          "Anxiety and existential emptiness are not failures of your system — they are signals of a deep disconnection from your inner self.",
    "home.metodo_label":       "Methodology",
    "home.metodo_title":       "THE AUTÉNTICAMENTE METHOD",
    "home.metodo_sub":         "A path designed to move from chaos to clarity.",
    "home.programs_label":     "Value Proposition",
    "home.programs_title":     "TRANSFORMATION LADDER",
    "home.programs_sub":       "Programs designed for every stage of your awakening and healing.",
    "home.learn_more":         "Learn more",
    "home.test_title":         "What stage of disconnection are you in today?",
    "home.test_sub":           "Take our free emotional assessment and receive a personalized roadmap to begin your return home.",
    "home.test_cta":           "Take the free test",
    "home.testimonials_label": "Testimonials",
    "home.testimonials_title": "VOICES OF WOMEN WHO RETURNED TO THEMSELVES",

    /* ── Método page ─────────────────────────────────────── */
    "metodo.hero.label":       "Methodology",
    "metodo.hero.title":       "THE AUTÉNTICAMENTE\nMETHOD",
    "metodo.hero.desc":        "Auténticamente integrates clinical psychology, emotional regulation, and spiritual consciousness. A method that accompanies women to understand their emotions, heal relational wounds, and rebuild their identity from inner truth.",
    "metodo.pillars.label":    "The Framework",
    "metodo.pillars.title":    "FOUR PHASES OF TRANSFORMATION",
    "metodo.programs.label":   "Value Proposition",
    "metodo.programs.title":   "CHOOSE YOUR PATH",
    "metodo.programs.desc":    "Transformative experiences designed for your specific stage of evolution.",
    "metodo.solicitar":        "Request information",
    "metodo.duracion":         "Duration",
    "metodo.formato":          "Format",
    "metodo.precio":           "Price",
    "metodo.incluye":          "Includes",
    "metodo.cta.label":        "Membership",
    "metodo.cta.title":        "Not sure where to start?",
    "metodo.cta.desc":         "Take the free emotional test and receive a personalized recommendation for your next step.",
    "metodo.cta.test":         "Take the emotional test",
    "metodo.cta.talk":         "Talk with Liset",

    /* ── Sobre page ──────────────────────────────────────── */
    "sobre.label":             "About Liset Valencia",
    "sobre.subtitle":          "Clinical Psychologist & Psycho-Spiritual Transformation Guide",
    "sobre.desc":              "Accompanying awakening and deep healing processes through the integration of the self. Her mission is to help women reconnect with their consciousness to heal from the deepest place.",
    "sobre.cta":               "Schedule consultation",
    "sobre.mision.label":      "Purpose · Mission",
    "sobre.mision.quote":      "\"To help women reconnect with their consciousness to heal from the deepest place, integrating mind with spirit.\"",
    "sobre.historia.label":    "My Story",
    "sobre.historia.title":    "A JOURNEY OF SELF-DISCOVERY",
    "sobre.historia.p1":       "From my beginnings in conventional clinical psychology, I felt the calling to go beyond symptoms. I understood that the psyche and spirit are threads of the same fabric that cannot be treated separately.",
    "sobre.historia.p2":       "A journey of self-discovery and dedication to mental and spiritual health that began over a decade ago. Today, my practice is the result of years of academic training and personal experiences.",
    "sobre.historia.p3":       "Those experiences allowed me to develop an integral method for feminine wellbeing — one that honors both science and the depth of the soul.",
    "sobre.valores.label":     "Our Values",
    "sobre.vision.label":      "Vision & Methodology",
    "sobre.vision.title":      "INTEGRATING PSYCHOLOGY AND SPIRITUALITY",
    "sobre.final.title":       "Ready to begin your transformation journey?",
    "sobre.final.desc":        "Schedule an initial consultation today and begin the path back to your true essence.",
    "sobre.final.cta":         "Schedule consultation",

    /* ── Biblioteca page ─────────────────────────────────── */
    "biblio.label":            "Digital Resources",
    "biblio.title":            "AUTÉNTICAMENTE LIBRARY",
    "biblio.desc":             "Digital tools designed to accompany you on your journey toward a fuller, more conscious, and empowered life.",
    "biblio.cat.todos":        "All",
    "biblio.cat.ebooks":       "Ebooks",
    "biblio.cat.meditaciones": "Meditations",
    "biblio.cat.masterclasses":"Masterclasses",
    "biblio.cat.workbooks":    "Workbooks",
    "biblio.buy":              "Buy",
    "biblio.payment":          "100% secure and guaranteed payment",
    "biblio.badge.bestseller": "Best seller",
    "biblio.badge.new":        "New",

    /* ── Test page ───────────────────────────────────────── */
    "test.label":              "Free Emotional Assessment",
    "test.title":              "Inner Wellbeing Questionnaire",
    "test.desc":               "A brief analysis to connect with your inner self, identify your shadows, and understand your current behavioral patterns.",
    "test.profiles.label":     "The 4 emotional profiles",
    "test.start":              "Start the test",
    "test.privacy":            "* Your answers are anonymous and used only to generate your emotional profile.",
    "test.question_of":        "of",
    "test.completed":          "% completed",
    "test.result.label":       "Your emotional profile",
    "test.result.rec_label":   "Personalized recommendation",
    "test.result.rec_desc":    "This program is specifically designed to accompany you in your current stage of inner process.",
    "test.result.know_prog":   "Explore the program",
    "test.result.retry":       "Retake the test",
    "test.pregunta":           "Question",

    /* ── Contacto page ───────────────────────────────────── */
    "contacto.label":          "Contact",
    "contacto.title":          "Begin your process",
    "contacto.desc":           "Take the first step. Write to us and Liset or her team will be in touch within 48 hours.",
    "contacto.quote":          "\"This is not about becoming someone else. It is about remembering who you already are.\"",
    "contacto.quote_by":       "— Dr. Liset Valencia Medina",
    "contacto.nombre":         "Full name",
    "contacto.nombre_ph":      "Your name",
    "contacto.email":          "Email address",
    "contacto.email_ph":       "your@email.com",
    "contacto.mensaje":        "Message",
    "contacto.mensaje_ph":     "How can we accompany you?",
    "contacto.send":           "Send message",
    "contacto.sent_title":     "Message received.",
    "contacto.sent_desc":      "Thank you for writing to us. We will be in touch within the next 48 hours.",

    /* ── Footer ──────────────────────────────────────────── */
    "footer.tagline":          "Accompanying women on their journey back to essence through deep psychology and conscious spirituality.",
    "footer.credential":       "Dr. Liset Valencia Medina — Clinical Psychologist",
    "footer.explorar":         "Explore",
    "footer.legal":            "Legal",
    "footer.metodo":           "The Method",
    "footer.programas":        "Programs",
    "footer.test":             "Emotional Test",
    "footer.biblioteca":       "Digital Library",
    "footer.sobre":            "About Liset",
    "footer.privacidad":       "Privacy Policy",
    "footer.terminos":         "Terms of Use",
    "footer.contacto":         "Contact",
    "footer.copyright":        "All rights reserved.",
    "footer.instagram":        "Instagram",

    /* ── Assistant ───────────────────────────────────────── */
    "assistant.name":          "Auténticamente Assistant",
    "assistant.message":       "Hi, I am the Auténticamente assistant. I am here to help you find the right program or schedule a consultation.",
    "assistant.test":          "Take the emotional test",
    "assistant.programs":      "View programs",
    "assistant.schedule":      "Schedule consultation",
    "assistant.whatsapp":      "Chat on WhatsApp",
    "assistant.footer":        "Auténticamente · Psycho-Spiritual Center",
  },
};

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

const LangContext = createContext<LangCtx>({
  lang: "es",
  setLang: () => {},
  t: (k) => k,
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");
  const t = (key: string) => trans[lang][key] ?? key;
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
