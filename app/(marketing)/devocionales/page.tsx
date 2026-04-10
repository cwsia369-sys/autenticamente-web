"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

/* ══════════════════════════════════════════════
   CONSTANTES DE JORNADA
   Inicio: 1 enero 2026  |  3645 días = ~10 años
══════════════════════════════════════════════ */
const START_DATE = new Date("2026-01-01T00:00:00");
const TOTAL_DAYS = 365;

function getDayNumber(date: Date): number {
  const diff = date.getTime() - START_DATE.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
}

function dateForDay(day: number): Date {
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + day - 1);
  return d;
}

/* ══════════════════════════════════════════════
   ÁREAS DE VIDA — colores y gradientes
══════════════════════════════════════════════ */
type Area = "pensamientos" | "emociones" | "acciones" | "espiritu" | "vinculos" | "proposito" | "identidad" | "cuerpo";

const AREAS: Record<Area, { label: string; labelEN: string; color: string; gA: string; gB: string }> = {
  pensamientos: { label: "Pensamientos", labelEN: "Thoughts",      color: "#6B4FA0", gA: "#2D1B4E", gB: "#6B4FA0" },
  emociones:    { label: "Emociones",    labelEN: "Emotions",      color: "#54132B", gA: "#1A0510", gB: "#54132B" },
  acciones:     { label: "Acciones",     labelEN: "Actions",       color: "#2E5E38", gA: "#0D1F12", gB: "#2E5E38" },
  espiritu:     { label: "Espíritu",     labelEN: "Spirit",        color: "#8A6F2E", gA: "#2A2008", gB: "#8A6F2E" },
  vinculos:     { label: "Vínculos",     labelEN: "Relationships", color: "#1E4A6E", gA: "#081525", gB: "#1E4A6E" },
  proposito:    { label: "Propósito",    labelEN: "Purpose",       color: "#7A3820", gA: "#270E06", gB: "#7A3820" },
  identidad:    { label: "Identidad",    labelEN: "Identity",      color: "#1E6B6B", gA: "#062020", gB: "#1E6B6B" },
  cuerpo:       { label: "Cuerpo",       labelEN: "Body",          color: "#4A6B2E", gA: "#141F0A", gB: "#4A6B2E" },
};

const AREA_ORDER: Area[] = ["pensamientos","emociones","acciones","espiritu","vinculos","proposito","identidad","cuerpo"];

/* ══════════════════════════════════════════════
   BANCO DE VERSÍCULOS — 64 entradas auténticas
   Organizados por área de vida
══════════════════════════════════════════════ */
interface Devotional {
  area:        Area;
  verse:       string;
  ref:         string;
  theme:       string;
  themeEN:     string;
  reflection:  string;
  reflectionEN: string;
  action:      string;
  actionEN:    string;
}

const VERSE_BANK: Devotional[] = [
  // ── PENSAMIENTOS ─────────────────────────────
  {
    area: "pensamientos",
    verse: "Todo lo que es verdadero, todo lo honesto, todo lo justo, todo lo puro, todo lo amable, todo lo que es de buen nombre... en esto pensad.",
    ref: "Filipenses 4:8",
    theme: "El poder del enfoque mental", themeEN: "The power of mental focus",
    reflection: "Tus pensamientos moldean tu realidad antes de que tus acciones la toquen. Hoy, elige conscientemente en qué territorio mental habitas.",
    reflectionEN: "Your thoughts shape your reality before your actions touch it. Today, consciously choose what mental territory you inhabit.",
    action: "Escribe 3 pensamientos recurrentes esta semana. ¿Cuáles nutren? ¿Cuáles drenan?",
    actionEN: "Write 3 recurring thoughts this week. Which nourish? Which drain?",
  },
  {
    area: "pensamientos",
    verse: "Transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios.",
    ref: "Romanos 12:2",
    theme: "Renovación del entendimiento", themeEN: "Renewal of understanding",
    reflection: "La transformación no viene de fuera hacia adentro. Comienza en el territorio silencioso de cómo piensas sobre ti misma y el mundo.",
    reflectionEN: "Transformation doesn't come from outside in. It begins in the silent territory of how you think about yourself and the world.",
    action: "Identifica una creencia limitante que llevas contigo. ¿De dónde viene? ¿Sigue siendo cierta hoy?",
    actionEN: "Identify one limiting belief you carry. Where does it come from? Is it still true today?",
  },
  {
    area: "pensamientos",
    verse: "Porque cual es su pensamiento en su corazón, tal es él.",
    ref: "Proverbios 23:7",
    theme: "Identidad y pensamiento", themeEN: "Identity and thought",
    reflection: "Lo que piensas de ti misma en silencio, cuando nadie te observa, es tu autoimagen real. Esa imagen construye o limita todo lo demás.",
    reflectionEN: "What you think of yourself in silence, when no one is watching, is your real self-image. That image builds or limits everything else.",
    action: "Pasa 5 minutos observando tus pensamientos como si fueras un testigo neutro. No juzgues. Solo observa.",
    actionEN: "Spend 5 minutes observing your thoughts as if you were a neutral witness. Don't judge. Just observe.",
  },
  {
    area: "pensamientos",
    verse: "Sean gratos los dichos de mi boca y la meditación de mi corazón delante de ti, oh Señor.",
    ref: "Salmo 19:14",
    theme: "Meditación y presencia", themeEN: "Meditation and presence",
    reflection: "La mente que no se cultiva con intención, se cultiva con lo urgente, lo superficial, lo que grita más. Hoy cultiva lo que murmura profundo.",
    reflectionEN: "The mind not intentionally cultivated grows with what's urgent, superficial, what shouts loudest. Today cultivate what whispers deeply.",
    action: "Antes de dormir, escribe una sola frase que resuma el pensamiento más valioso del día.",
    actionEN: "Before sleeping, write one sentence that summarizes the most valuable thought of the day.",
  },
  {
    area: "pensamientos",
    verse: "Llevar cautivo todo pensamiento a la obediencia de Cristo.",
    ref: "2 Corintios 10:5",
    theme: "Disciplina mental", themeEN: "Mental discipline",
    reflection: "No todos los pensamientos que llegan a tu mente son tuyos. Algunos son herencias, algunos son miedos aprendidos. Tú decides cuáles alojas.",
    reflectionEN: "Not every thought that arrives in your mind is yours. Some are inheritances, some are learned fears. You decide which ones you house.",
    action: "Cuando notes un pensamiento negativo hoy, di internamente: 'Observo este pensamiento. No soy este pensamiento.'",
    actionEN: "When you notice a negative thought today, say internally: 'I observe this thought. I am not this thought.'",
  },
  {
    area: "pensamientos",
    verse: "No os conforméis a este siglo, sino transformaos.",
    ref: "Romanos 12:2",
    theme: "No conformarse", themeEN: "Non-conformity",
    reflection: "El mundo te invita constantemente a pensar en términos de escasez, comparación y urgencia. Crecer es aprender a resistir esa corriente.",
    reflectionEN: "The world constantly invites you to think in terms of scarcity, comparison and urgency. Growing is learning to resist that current.",
    action: "Hoy, cada vez que vayas a compararte con alguien, redirige esa energía a preguntarte: ¿qué quiero yo para mi vida?",
    actionEN: "Today, every time you're about to compare yourself to someone, redirect that energy to asking: what do I want for my life?",
  },
  {
    area: "pensamientos",
    verse: "Porque mis pensamientos no son vuestros pensamientos, ni vuestros caminos mis caminos.",
    ref: "Isaías 55:8",
    theme: "Humildad intelectual", themeEN: "Intellectual humility",
    reflection: "Hay una sabiduría mayor que la nuestra disponible en cada momento. La humildad de no saber todo es el inicio del verdadero aprendizaje.",
    reflectionEN: "There is a wisdom greater than ours available at every moment. The humility of not knowing everything is the beginning of true learning.",
    action: "Hoy, cuando estés segura de algo, pregúntate: ¿qué no estoy viendo? Practica la apertura.",
    actionEN: "Today, when you're certain of something, ask yourself: what am I not seeing? Practice openness.",
  },
  {
    area: "pensamientos",
    verse: "Analizad si estáis en la fe; probaos a vosotros mismos.",
    ref: "2 Corintios 13:5",
    theme: "Autoexamen", themeEN: "Self-examination",
    reflection: "El autoexamen honesto es una de las formas más valientes de amor propio. Mirarte sin escaparte requiere coraje y también compasión.",
    reflectionEN: "Honest self-examination is one of the bravest forms of self-love. Looking at yourself without escaping requires courage and also compassion.",
    action: "Hazte hoy esta pregunta en silencio: ¿Estoy viviendo desde mis valores o desde mis miedos?",
    actionEN: "Ask yourself this question in silence today: Am I living from my values or from my fears?",
  },

  // ── EMOCIONES ─────────────────────────────────
  {
    area: "emociones",
    verse: "Cercano está el Señor a los quebrantados de corazón; y salva a los contritos de espíritu.",
    ref: "Salmo 34:18",
    theme: "El dolor como puerta", themeEN: "Pain as a doorway",
    reflection: "El dolor no es señal de debilidad ni de que algo está mal en ti. Es la señal de que algo importa, de que sigues viva, de que tu corazón siente.",
    reflectionEN: "Pain is not a sign of weakness or that something is wrong with you. It's a sign that something matters, that you're still alive, that your heart feels.",
    action: "Si hay algo que duele hoy, siéntalo sin justificarlo ni minimizarlo. Solo di: 'Esto duele, y está bien que duela.'",
    actionEN: "If something hurts today, feel it without justifying or minimizing it. Just say: 'This hurts, and it's okay that it hurts.'",
  },
  {
    area: "emociones",
    verse: "¿Por qué te abates, oh alma mía, y por qué te turbas dentro de mí? Espera en Dios.",
    ref: "Salmo 42:5",
    theme: "Diálogo interior en la tristeza", themeEN: "Inner dialogue in sadness",
    reflection: "El salmista habla consigo mismo. Se pregunta por qué se siente así. Ese acto — mirarse con curiosidad en lugar de juicio — es psicología profunda.",
    reflectionEN: "The psalmist talks to himself. He asks why he feels this way. That act — looking at oneself with curiosity instead of judgment — is deep psychology.",
    action: "Cuando sientas una emoción difícil hoy, en lugar de suprimirla, pregúntale: ¿qué me quieres decir?",
    actionEN: "When you feel a difficult emotion today, instead of suppressing it, ask it: what are you trying to tell me?",
  },
  {
    area: "emociones",
    verse: "Por la noche durará el lloro, y a la mañana vendrá la alegría.",
    ref: "Salmo 30:5",
    theme: "La temporalidad del dolor", themeEN: "The temporality of pain",
    reflection: "Ninguna emoción es permanente. Ni el gozo ni el dolor. Esta verdad no minimiza lo que sientes — te recuerda que eres más grande que este momento.",
    reflectionEN: "No emotion is permanent. Neither joy nor pain. This truth doesn't minimize what you feel — it reminds you that you are larger than this moment.",
    action: "Piensa en un momento difícil del pasado que ya pasó. ¿Qué aprendiste al otro lado de esa noche?",
    actionEN: "Think of a difficult past moment that has already passed. What did you learn on the other side of that night?",
  },
  {
    area: "emociones",
    verse: "Jesús lloró.",
    ref: "Juan 11:35",
    theme: "El permiso de llorar", themeEN: "Permission to cry",
    reflection: "El versículo más corto de la Biblia es también uno de los más poderosos. Dios encarnado llora. Las lágrimas no son falta de fe — son humanidad.",
    reflectionEN: "The shortest verse in the Bible is also one of the most powerful. God incarnate weeps. Tears are not lack of faith — they are humanity.",
    action: "Hoy date permiso de sentir sin tener que justificarlo, ni acelerarlo, ni explicarlo a nadie.",
    actionEN: "Today give yourself permission to feel without having to justify it, rush it, or explain it to anyone.",
  },
  {
    area: "emociones",
    verse: "El Señor es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar.",
    ref: "Salmo 23:1-2",
    theme: "Descanso emocional", themeEN: "Emotional rest",
    reflection: "El descanso no es pereza. Es una práctica espiritual y emocional esencial. Tu sistema nervioso necesita pausas tanto como necesita movimiento.",
    reflectionEN: "Rest is not laziness. It is an essential spiritual and emotional practice. Your nervous system needs pauses as much as it needs movement.",
    action: "Dedica 10 minutos hoy a no hacer nada. Sin pantalla. Sin música. Solo quietud. Observa lo que emerge.",
    actionEN: "Spend 10 minutes today doing nothing. No screen. No music. Just stillness. Observe what emerges.",
  },
  {
    area: "emociones",
    verse: "Echad toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.",
    ref: "1 Pedro 5:7",
    theme: "Soltar la ansiedad", themeEN: "Releasing anxiety",
    reflection: "La ansiedad no siempre se resuelve con acción. A veces se necesita soltarla — reconocer que no todo depende de ti y hay algo más grande sosteniéndote.",
    reflectionEN: "Anxiety is not always resolved with action. Sometimes it needs to be released — recognizing that not everything depends on you and something greater holds you.",
    action: "Escribe en papel aquello que te genera más ansiedad hoy. Luego escribe: 'Esto no está solo en mis manos.' Suéltalo.",
    actionEN: "Write on paper what generates the most anxiety for you today. Then write: 'This is not in my hands alone.' Release it.",
  },
  {
    area: "emociones",
    verse: "Me has dado a conocer los caminos de la vida; me llenarás de gozo con tu presencia.",
    ref: "Hechos 2:28",
    theme: "Gozo profundo", themeEN: "Deep joy",
    reflection: "El gozo bíblico es distinto a la felicidad superficial. No depende de las circunstancias. Es una paz que permanece incluso en medio de la tormenta.",
    reflectionEN: "Biblical joy is different from superficial happiness. It doesn't depend on circumstances. It's a peace that remains even in the midst of the storm.",
    action: "Busca hoy tres cosas pequeñas por las que puedas sentir gratitud genuina. No las grandes — las pequeñas, las que normalmente no ves.",
    actionEN: "Find three small things today you can feel genuine gratitude for. Not the big ones — the small ones you normally don't see.",
  },
  {
    area: "emociones",
    verse: "El corazón alegre constituye buen remedio; mas el espíritu triste seca los huesos.",
    ref: "Proverbios 17:22",
    theme: "Emociones y salud", themeEN: "Emotions and health",
    reflection: "La ciencia confirma lo que los Proverbios ya sabían: nuestro estado emocional tiene efecto directo en nuestra biología. El alma y el cuerpo se hablan.",
    reflectionEN: "Science confirms what Proverbs already knew: our emotional state has a direct effect on our biology. The soul and body speak to each other.",
    action: "Hoy haz una sola cosa que te genere alegría genuina, no por obligación. Solo porque te hace bien.",
    actionEN: "Today do one thing that generates genuine joy, not out of obligation. Just because it does you good.",
  },

  // ── ACCIONES ──────────────────────────────────
  {
    area: "acciones",
    verse: "No nos cansemos, pues, de hacer bien; porque a su tiempo segaremos, si no desmayamos.",
    ref: "Gálatas 6:9",
    theme: "Perseverancia en lo bueno", themeEN: "Perseverance in good",
    reflection: "La constancia sin espectáculo es la forma más poderosa de acción. Lo que haces todos los días en silencio define mucho más quién eres que lo que haces en los grandes momentos.",
    reflectionEN: "Consistency without spectacle is the most powerful form of action. What you do every day in silence defines you far more than what you do in great moments.",
    action: "Identifica un hábito pequeño que quieres construir. Hazlo hoy, sin motivación, solo por elección.",
    actionEN: "Identify a small habit you want to build. Do it today, without motivation, just by choice.",
  },
  {
    area: "acciones",
    verse: "Todo lo puedo en Cristo que me fortalece.",
    ref: "Filipenses 4:13",
    theme: "Fortaleza para actuar", themeEN: "Strength to act",
    reflection: "Este versículo no es sobre el superheroísmo. Es sobre encontrar fuerza más allá de la tuya propia para hacer lo que necesitas hacer, especialmente cuando no quieres.",
    reflectionEN: "This verse is not about superheroes. It's about finding strength beyond your own to do what you need to do, especially when you don't want to.",
    action: "¿Hay algo que has estado posponiendo? Da solo el primer paso hoy. Solo uno.",
    actionEN: "Is there something you've been postponing? Take just the first step today. Just one.",
  },
  {
    area: "acciones",
    verse: "Así también la fe, si no tiene obras, es muerta en sí misma.",
    ref: "Santiago 2:17",
    theme: "Fe con movimiento", themeEN: "Faith with movement",
    reflection: "Creer sin actuar es un sueño. Actuar sin creer es agotamiento. La integración de ambos — fe encarnada en pasos concretos — es lo que produce transformación real.",
    reflectionEN: "Believing without acting is a dream. Acting without believing is exhaustion. The integration of both — faith embodied in concrete steps — is what produces real transformation.",
    action: "Escribe una intención que tienes. Luego escribe el primer paso concreto, con fecha y hora específicas.",
    actionEN: "Write an intention you have. Then write the first concrete step, with specific date and time.",
  },
  {
    area: "acciones",
    verse: "Somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas.",
    ref: "Efesios 2:10",
    theme: "Propósito en la acción", themeEN: "Purpose in action",
    reflection: "Fuiste diseñada para algo específico. Tus acciones cotidianas no son pequeñas cuando las orientas desde ese propósito. Cada paso cuenta cuando sabes hacia dónde vas.",
    reflectionEN: "You were designed for something specific. Your daily actions are not small when oriented from that purpose. Every step counts when you know where you're going.",
    action: "Antes de empezar tu día, pregúntate: ¿qué haré hoy que esté alineado con lo que más importa en mi vida?",
    actionEN: "Before starting your day, ask yourself: what will I do today that is aligned with what matters most in my life?",
  },
  {
    area: "acciones",
    verse: "Encomienda al Señor tus obras, y tus pensamientos serán afirmados.",
    ref: "Proverbios 16:3",
    theme: "Acción con fundamento", themeEN: "Action with foundation",
    reflection: "Las mejores acciones no nacen del miedo a quedarse atrás, sino de la claridad sobre para qué estás aquí. Actuar desde ese lugar produce resultados distintos.",
    reflectionEN: "The best actions don't come from fear of falling behind, but from clarity about what you're here for. Acting from that place produces different results.",
    action: "Antes de tomar una decisión importante hoy, pregúntate: ¿lo hago desde el miedo o desde el amor?",
    actionEN: "Before making an important decision today, ask yourself: am I doing this from fear or from love?",
  },
  {
    area: "acciones",
    verse: "Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres.",
    ref: "Colosenses 3:23",
    theme: "Excelencia interior", themeEN: "Inner excellence",
    reflection: "La excelencia real no busca aplausos. Nace de un compromiso interno con hacer bien lo que haces, aunque nadie lo vea. Esa integridad es la que te construye por dentro.",
    reflectionEN: "Real excellence doesn't seek applause. It comes from an internal commitment to doing well what you do, even if no one sees it. That integrity is what builds you from within.",
    action: "Haz hoy una sola tarea con total presencia y cuidado, sin prisa, sin distracciones. Ofrécela como acto de amor.",
    actionEN: "Do one task today with total presence and care, without rushing, without distractions. Offer it as an act of love.",
  },
  {
    area: "acciones",
    verse: "El diligente será prosperado.",
    ref: "Proverbios 13:4",
    theme: "Diligencia", themeEN: "Diligence",
    reflection: "La diligencia no es activismo frenético. Es la dedicación sostenida a lo que importa, incluso cuando el resultado aún no se ve. Es confiar en el proceso.",
    reflectionEN: "Diligence is not frantic activism. It is sustained dedication to what matters, even when the result is not yet visible. It is trusting the process.",
    action: "Identifica una área de tu vida donde hayas estado esperando inspiración para actuar. Actúa hoy sin ella.",
    actionEN: "Identify an area of your life where you've been waiting for inspiration to act. Act today without it.",
  },
  {
    area: "acciones",
    verse: "Mejor es el fin del negocio que su principio.",
    ref: "Eclesiastés 7:8",
    theme: "Terminar lo comenzado", themeEN: "Finishing what you start",
    reflection: "Comenzar es fácil — la energía del inicio siempre existe. Lo que revela el carácter es sostenerse cuando la novedad ya no existe y solo queda el compromiso.",
    reflectionEN: "Starting is easy — the energy of beginning always exists. What reveals character is sustaining when novelty is gone and only commitment remains.",
    action: "Completa hoy algo que hayas dejado a medias. No importa qué tan pequeño sea. Termina.",
    actionEN: "Complete something today that you left half-done. No matter how small. Finish it.",
  },

  // ── ESPÍRITU ──────────────────────────────────
  {
    area: "espiritu",
    verse: "Los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas.",
    ref: "Isaías 40:31",
    theme: "Renovación espiritual", themeEN: "Spiritual renewal",
    reflection: "Hay una fuerza que no surge de ti pero fluye a través de ti cuando te permites quietud. El águila no pelea el viento — lo usa. Aprende a usar lo que está más allá de ti.",
    reflectionEN: "There is a strength that doesn't arise from you but flows through you when you allow stillness. The eagle doesn't fight the wind — it uses it. Learn to use what is beyond you.",
    action: "Dedica 10 minutos hoy a estar en silencio absoluto, sin agenda. Solo recibir.",
    actionEN: "Spend 10 minutes today in absolute silence, with no agenda. Just receive.",
  },
  {
    area: "espiritu",
    verse: "Crea en mí, oh Dios, un corazón limpio, y renueva un espíritu recto dentro de mí.",
    ref: "Salmo 51:10",
    theme: "Renovación interior", themeEN: "Inner renewal",
    reflection: "El corazón limpio no es el que nunca ha caído — es el que sigue dispuesto a levantarse. La honestidad con uno mismo y con Dios es el punto de partida de toda renovación.",
    reflectionEN: "The clean heart is not one that has never fallen — it is one that remains willing to rise. Honesty with yourself and with God is the starting point of all renewal.",
    action: "¿Hay algo que has estado evitando mirar internamente? Hoy, con compasión, dale un vistazo.",
    actionEN: "Is there something you've been avoiding looking at internally? Today, with compassion, take a look.",
  },
  {
    area: "espiritu",
    verse: "El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios.",
    ref: "Romanos 8:16",
    theme: "Identidad espiritual", themeEN: "Spiritual identity",
    reflection: "Tu identidad más profunda no se construye con logros, validaciones ni apariencias. Hay algo en ti que ya es, que ya pertenece, que ya es amado. Eso es el fundamento.",
    reflectionEN: "Your deepest identity is not built with achievements, validations or appearances. There is something in you that already is, already belongs, already is loved. That is the foundation.",
    action: "Repite hoy en silencio: 'Soy amada. Soy suficiente. Pertenezco.' Observa cómo se siente.",
    actionEN: "Repeat today in silence: 'I am loved. I am enough. I belong.' Observe how it feels.",
  },
  {
    area: "espiritu",
    verse: "Dios es Espíritu; y los que le adoran, en espíritu y en verdad es necesario que adoren.",
    ref: "Juan 4:24",
    theme: "Adoración auténtica", themeEN: "Authentic worship",
    reflection: "La espiritualidad auténtica no es performance ni ritual vacío. Es la orientación de toda tu vida — pensamientos, emociones, decisiones — hacia algo más grande que tú misma.",
    reflectionEN: "Authentic spirituality is not performance or empty ritual. It is the orientation of your entire life — thoughts, emotions, decisions — toward something greater than yourself.",
    action: "Hoy, convierte un acto ordinario (comer, caminar, trabajar) en un acto consciente de presencia y gratitud.",
    actionEN: "Today, transform an ordinary act (eating, walking, working) into a conscious act of presence and gratitude.",
  },
  {
    area: "espiritu",
    verse: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
    ref: "Juan 1:1",
    theme: "El poder de la Palabra", themeEN: "The power of the Word",
    reflection: "Todo comienza con la palabra — la tuya también. Lo que te dices a ti misma cada día está creando tu mundo interior constantemente. Cuida tu diálogo interno.",
    reflectionEN: "Everything begins with the word — yours too. What you tell yourself every day is constantly creating your inner world. Guard your inner dialogue.",
    action: "Escribe una declaración de vida hoy. Una sola frase que resuma quién quieres ser. Léela en voz alta.",
    actionEN: "Write a life declaration today. One single phrase that summarizes who you want to be. Read it aloud.",
  },
  {
    area: "espiritu",
    verse: "Estad quietos, y conoced que yo soy Dios.",
    ref: "Salmo 46:10",
    theme: "Quietud espiritual", themeEN: "Spiritual stillness",
    reflection: "En nuestra cultura que glorifica la productividad, la quietud parece improductiva. Pero la quietud es donde el espíritu se reorienta, donde la sabiduría emerge, donde escuchas.",
    reflectionEN: "In our culture that glorifies productivity, stillness seems unproductive. But stillness is where the spirit reorients, where wisdom emerges, where you listen.",
    action: "Sin teléfono, sin música. Siéntate 7 minutos hoy. Solo sé. Observa qué emerge del silencio.",
    actionEN: "Without phone, without music. Sit for 7 minutes today. Just be. Observe what emerges from silence.",
  },
  {
    area: "espiritu",
    verse: "La gracia y la paz os sean multiplicadas.",
    ref: "1 Pedro 1:2",
    theme: "Gracia como base", themeEN: "Grace as foundation",
    reflection: "La gracia no se gana — se recibe. Eso cambia todo. No tienes que merecer el amor, la paz ni el perdón. Ya están disponibles para ti en este momento.",
    reflectionEN: "Grace is not earned — it is received. That changes everything. You don't have to deserve love, peace or forgiveness. They are already available to you in this moment.",
    action: "Escribe una cosa que te has estado negando por sentir que no la mereces. Hoy, recíbela.",
    actionEN: "Write one thing you've been denying yourself because you felt you didn't deserve it. Today, receive it.",
  },
  {
    area: "espiritu",
    verse: "Bienaventurados los de limpio corazón, porque ellos verán a Dios.",
    ref: "Mateo 5:8",
    theme: "Pureza interior", themeEN: "Inner purity",
    reflection: "La pureza de corazón no es perfección moral — es integridad. Es que lo que piensas, lo que dices y lo que haces estén alineados. Es vivir sin fachadas.",
    reflectionEN: "Purity of heart is not moral perfection — it is integrity. It is having what you think, say and do aligned. It is living without facades.",
    action: "¿Hay una incoherencia entre lo que dices valorar y lo que realmente haces? Identifícala hoy con honestidad.",
    actionEN: "Is there an inconsistency between what you say you value and what you actually do? Identify it today with honesty.",
  },

  // ── VÍNCULOS ──────────────────────────────────
  {
    area: "vinculos",
    verse: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.",
    ref: "1 Corintios 13:4",
    theme: "La arquitectura del amor", themeEN: "The architecture of love",
    reflection: "El amor real no es un sentimiento que viene y va — es una decisión que se practica. Esta definición es exigente porque nos dice que el amor es obra, no solo emoción.",
    reflectionEN: "Real love is not a feeling that comes and goes — it is a decision that is practiced. This definition is demanding because it tells us that love is work, not just emotion.",
    action: "Hoy, elige amar a alguien de forma concreta: un gesto, una palabra, un acto de servicio sin esperar nada a cambio.",
    actionEN: "Today, choose to love someone in a concrete way: a gesture, a word, an act of service expecting nothing in return.",
  },
  {
    area: "vinculos",
    verse: "Soportándoos unos a otros, y perdonándoos unos a otros si alguno tuviere queja contra otro.",
    ref: "Colosenses 3:13",
    theme: "El perdón como práctica", themeEN: "Forgiveness as practice",
    reflection: "El perdón no es decir que lo que te hicieron estuvo bien. Es soltar el peso de cargarlo tú. El perdón te libera a ti, antes que a quien te lastimó.",
    reflectionEN: "Forgiveness is not saying what was done to you was okay. It is releasing the weight of carrying it yourself. Forgiveness liberates you, before it liberates the one who hurt you.",
    action: "¿Hay alguien a quien no has perdonado completamente? Hoy, da un primer paso interno: decide que quieres soltar esa carga.",
    actionEN: "Is there someone you haven't fully forgiven? Today, take an internal first step: decide you want to release that burden.",
  },
  {
    area: "vinculos",
    verse: "Un mandamiento nuevo os doy: Que os améis unos a otros; como yo os he amado.",
    ref: "Juan 13:34",
    theme: "Amar como fuiste amada", themeEN: "Love as you were loved",
    reflection: "La referencia para amar no es cómo fuiste amada en tu infancia — ese amor fue imperfecto. La referencia es un amor que da sin condicionar, que ve sin juzgar.",
    reflectionEN: "The reference for love is not how you were loved in childhood — that love was imperfect. The reference is love that gives without conditioning, that sees without judging.",
    action: "Piensa en alguien que ahora mismo necesita ser visto. Hoy, dile algo genuino y específico que valoras en esa persona.",
    actionEN: "Think of someone who right now needs to be seen. Today, tell them something genuine and specific you value in that person.",
  },
  {
    area: "vinculos",
    verse: "En todo tiempo ama el amigo, y es como un hermano en tiempo de angustia.",
    ref: "Proverbios 17:17",
    theme: "Presencia en la dificultad", themeEN: "Presence in difficulty",
    reflection: "La amistad verdadera no se mide en los momentos buenos — se mide en la capacidad de estar presente cuando todo está difícil, sin necesidad de arreglar nada.",
    reflectionEN: "True friendship is not measured in good moments — it is measured in the capacity to be present when everything is difficult, without needing to fix anything.",
    action: "¿Hay alguien en tu vida pasando por un momento difícil? Escríbele hoy solo para decir: estoy aquí.",
    actionEN: "Is there someone in your life going through a difficult time? Write to them today just to say: I'm here.",
  },
  {
    area: "vinculos",
    verse: "Sed bondadosos unos con otros, misericordiosos, perdonándoos unos a otros.",
    ref: "Efesios 4:32",
    theme: "Bondad activa", themeEN: "Active kindness",
    reflection: "La bondad no es solo la ausencia de maldad. Es un movimiento activo hacia el otro. Requiere que salgas de ti misma por un momento para ver al otro realmente.",
    reflectionEN: "Kindness is not just the absence of malice. It is an active movement toward the other. It requires stepping outside yourself for a moment to truly see the other.",
    action: "Haz hoy un gesto de bondad no planificado hacia alguien inesperado — y no lo cuentes a nadie.",
    actionEN: "Do an unplanned act of kindness today toward an unexpected person — and don't tell anyone about it.",
  },
  {
    area: "vinculos",
    verse: "Honra a tu padre y a tu madre.",
    ref: "Éxodo 20:12",
    theme: "Raíces y sanación", themeEN: "Roots and healing",
    reflection: "Honrar a nuestros padres no significa idealizar su historia ni negar el dolor que hubo. Significa sanar la relación con nuestro origen para poder movernos libres hacia adelante.",
    reflectionEN: "Honoring our parents doesn't mean idealizing their story or denying the pain that existed. It means healing the relationship with our origin so we can move forward freely.",
    action: "Piensa en un patrón relacional que heredaste de tu familia de origen. ¿Qué quieres mantener? ¿Qué quieres transformar?",
    actionEN: "Think of a relational pattern you inherited from your family of origin. What do you want to keep? What do you want to transform?",
  },
  {
    area: "vinculos",
    verse: "Así que, somos embajadores en nombre de Cristo.",
    ref: "2 Corintios 5:20",
    theme: "Influencia desde el carácter", themeEN: "Influence from character",
    reflection: "Cada relación es un territorio donde puedes sembrar algo. No de forma impostada o predicando — sino desde quien genuinamente eres. Eso es lo que transforma.",
    reflectionEN: "Every relationship is a territory where you can sow something. Not in a fake way or by preaching — but from who you genuinely are. That is what transforms.",
    action: "Hoy observa el impacto que tienes en las personas que te rodean. ¿Qué sienten después de estar contigo?",
    actionEN: "Today observe the impact you have on the people around you. How do they feel after being with you?",
  },
  {
    area: "vinculos",
    verse: "No os olvidéis de la hospitalidad, porque por ella algunos, sin saberlo, hospedaron ángeles.",
    ref: "Hebreos 13:2",
    theme: "El don de la hospitalidad", themeEN: "The gift of hospitality",
    reflection: "Hospitalidad no es tener la casa perfecta — es crear un espacio donde el otro se sienta visto, acogido y seguro. Eso es un don que se cultiva desde adentro.",
    reflectionEN: "Hospitality is not having the perfect home — it is creating a space where others feel seen, welcomed and safe. That is a gift cultivated from within.",
    action: "Hoy, crea un espacio de acogida real para alguien: escucha sin interrumpir, sin juzgar, sin dar consejos. Solo recibe lo que dice.",
    actionEN: "Today, create a space of genuine welcome for someone: listen without interrupting, without judging, without giving advice. Just receive what they say.",
  },

  // ── PROPÓSITO ─────────────────────────────────
  {
    area: "proposito",
    verse: "Porque yo sé los pensamientos que tengo acerca de vosotros, pensamientos de paz, y no de mal, para daros el fin que esperáis.",
    ref: "Jeremías 29:11",
    theme: "El diseño mayor", themeEN: "The greater design",
    reflection: "Hay un hilo conductor en tu historia que quizás no siempre ves desde adentro. Confiar en ese hilo no es ingenuidad — es fe basada en la evidencia de lo que ya has sobrevivido.",
    reflectionEN: "There is a connecting thread in your story that you may not always see from within. Trusting that thread is not naivety — it is faith based on the evidence of what you have already survived.",
    action: "Conecta tres puntos de tu historia: una dificultad que viviste, lo que aprendiste, y cómo eso te sirve hoy.",
    actionEN: "Connect three points of your story: a difficulty you lived, what you learned, and how that serves you today.",
  },
  {
    area: "proposito",
    verse: "Sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.",
    ref: "Romanos 8:28",
    theme: "El bien en todo", themeEN: "Good in everything",
    reflection: "Este versículo no dice que todo será bueno. Dice que todo ayuda a bien. La diferencia es enorme: incluso lo difícil puede volverse material de construcción en tus manos.",
    reflectionEN: "This verse doesn't say everything will be good. It says everything helps toward good. The difference is enormous: even the difficult can become building material in your hands.",
    action: "Piensa en algo difícil que estás viviendo. ¿Qué podría estar aprendiendo o construyendo a través de eso?",
    actionEN: "Think of something difficult you're experiencing. What might you be learning or building through it?",
  },
  {
    area: "proposito",
    verse: "Para esto naciste, y para esto has venido al mundo.",
    ref: "Juan 18:37",
    theme: "Nacida para esto", themeEN: "Born for this",
    reflection: "Hay algo para lo que fuiste diseñada de manera única. No tiene que ser grandioso — puede ser íntimo, cotidiano, específico. Pero es tuyo y nadie más puede hacerlo igual.",
    reflectionEN: "There is something you were uniquely designed for. It doesn't have to be grand — it can be intimate, everyday, specific. But it is yours and no one else can do it the same way.",
    action: "Completa esta frase: 'Cuando hago _______, el tiempo parece desaparecer y me siento completamente yo misma.'",
    actionEN: "Complete this sentence: 'When I do _______, time seems to disappear and I feel completely myself.'",
  },
  {
    area: "proposito",
    verse: "El Señor cumplirá su propósito en mí.",
    ref: "Salmo 138:8",
    theme: "Confianza en el proceso", themeEN: "Trust in the process",
    reflection: "No tienes que tener todo claro para avanzar. El propósito muchas veces se revela caminando, no antes de caminar. Confía en que está siendo cumplido incluso cuando no lo ves.",
    reflectionEN: "You don't need to have everything clear to move forward. Purpose is often revealed by walking, not before walking. Trust that it is being fulfilled even when you don't see it.",
    action: "Escribe donde estás hoy comparado con donde estabas hace un año. ¿Qué propósito se ha ido revelando?",
    actionEN: "Write where you are today compared to where you were a year ago. What purpose has been revealing itself?",
  },
  {
    area: "proposito",
    verse: "Cada uno según el don que ha recibido, minístrelo a los otros.",
    ref: "1 Pedro 4:10",
    theme: "Dones únicos", themeEN: "Unique gifts",
    reflection: "Lo que te fue dado — tus talentos, tu historia, tu manera de ver — no es solo para ti. Está diseñado para ofrecerse. Guardarlo es desperdiciar lo que vino a través de ti.",
    reflectionEN: "What was given to you — your talents, your story, your way of seeing — is not just for you. It is designed to be offered. Keeping it is wasting what came through you.",
    action: "¿Qué tienes tú que otros necesitan y que aún no has ofrecido completamente? Escribe una forma de empezar a ofrecerlo.",
    actionEN: "What do you have that others need and you haven't fully offered yet? Write one way to begin offering it.",
  },
  {
    area: "proposito",
    verse: "Y todo lo que hagáis, hacedlo de corazón, como para el Señor.",
    ref: "Colosenses 3:23",
    theme: "Propósito en lo ordinario", themeEN: "Purpose in the ordinary",
    reflection: "El propósito no siempre vive en los grandes gestos. Vive también en cómo tratas al cajero, en cómo escuchas a tu hija, en cómo te hablas a ti misma en el espejo.",
    reflectionEN: "Purpose doesn't always live in grand gestures. It also lives in how you treat the cashier, how you listen to your daughter, how you speak to yourself in the mirror.",
    action: "Elige una tarea ordinaria de hoy y hazla como si fuera lo más importante del mundo. Observa cómo eso cambia la experiencia.",
    actionEN: "Choose an ordinary task today and do it as if it were the most important thing in the world. Observe how that changes the experience.",
  },
  {
    area: "proposito",
    verse: "El que tiene oído, oiga lo que el Espíritu dice.",
    ref: "Apocalipsis 2:7",
    theme: "Escuchar el llamado", themeEN: "Hearing the call",
    reflection: "A veces el llamado no llega en un momento dramático — llega en un susurro repetido durante años que finalmente decides escuchar. ¿Qué susurro llevas tiempo ignorando?",
    reflectionEN: "Sometimes the calling doesn't arrive in a dramatic moment — it arrives in a repeated whisper for years that you finally decide to hear. What whisper have you been ignoring for a while?",
    action: "Escribe aquello que llevas mucho tiempo pensando hacer pero que postpones. ¿Qué pasaría si lo empezaras hoy?",
    actionEN: "Write what you've been thinking about doing for a long time but keep postponing. What would happen if you started it today?",
  },
  {
    area: "proposito",
    verse: "Enseñad a los jóvenes de acuerdo al camino que deben seguir.",
    ref: "Proverbios 22:6",
    theme: "Legado", themeEN: "Legacy",
    reflection: "Cada vida deja una huella. La pregunta no es si dejarás legado — ya lo estás dejando. La pregunta es: ¿qué clase de huella quieres que permanezca cuando ya no estés?",
    reflectionEN: "Every life leaves a mark. The question is not whether you will leave a legacy — you already are. The question is: what kind of mark do you want to remain when you're gone?",
    action: "Escribe una carta a alguien más joven que tú con lo más importante que has aprendido sobre la vida hasta ahora.",
    actionEN: "Write a letter to someone younger than you with the most important thing you've learned about life so far.",
  },

  // ── IDENTIDAD ─────────────────────────────────
  {
    area: "identidad",
    verse: "Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillado, y mi alma lo sabe muy bien.",
    ref: "Salmo 139:14",
    theme: "Maravilla de ser tú", themeEN: "The wonder of being you",
    reflection: "Eres una creación que no existía antes de ti y no volverá a existir igual. Esa singularidad no es accidental — es intencional, es diseño, es propósito.",
    reflectionEN: "You are a creation that didn't exist before you and will not exist the same way again. That uniqueness is not accidental — it is intentional, it is design, it is purpose.",
    action: "Escribe 5 cosas genuinamente únicas de ti que no estén relacionadas con logros o roles (hija, madre, profesional).",
    actionEN: "Write 5 genuinely unique things about you that are not related to achievements or roles (daughter, mother, professional).",
  },
  {
    area: "identidad",
    verse: "Y Dios creó al hombre a su imagen, a imagen de Dios lo creó.",
    ref: "Génesis 1:27",
    theme: "Imago Dei", themeEN: "Imago Dei",
    reflection: "Llevas impresa una imagen que ninguna experiencia puede borrar completamente. Aunque se haya oscurecido, sigue ahí. La sanación es a veces el proceso de recuperar esa imagen.",
    reflectionEN: "You carry an imprint that no experience can completely erase. Even if it has darkened, it's still there. Healing is sometimes the process of recovering that image.",
    action: "¿Qué parte de ti fue herida o escondida en algún momento de tu vida? Hoy, nombrala con gentileza y dile: aquí estoy.",
    actionEN: "What part of you was hurt or hidden at some point in your life? Today, name it gently and say: here I am.",
  },
  {
    area: "identidad",
    verse: "De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.",
    ref: "2 Corintios 5:17",
    theme: "Nueva identidad", themeEN: "New identity",
    reflection: "No estás atada a quien eras. La historia que llevas no determina quién puedes llegar a ser. La transformación es posible — no como negación del pasado, sino como construcción sobre él.",
    reflectionEN: "You are not bound to who you were. The story you carry does not determine who you can become. Transformation is possible — not as denial of the past, but as construction upon it.",
    action: "Escribe tres frases que comiencen con 'Ya no soy...' y tres que comiencen con 'Ahora soy...'",
    actionEN: "Write three sentences beginning with 'I am no longer...' and three beginning with 'Now I am...'",
  },
  {
    area: "identidad",
    verse: "Mirad cuál amor nos ha dado el Padre, para que seamos llamados hijos de Dios.",
    ref: "1 Juan 3:1",
    theme: "Pertenencia radical", themeEN: "Radical belonging",
    reflection: "La mayor crisis de identidad no es no saber qué hacer — es no saber a quién perteneces. Cuando sabes que perteneces, cambia todo: tu valor no está en juego en cada conversación.",
    reflectionEN: "The greatest identity crisis is not not knowing what to do — it is not knowing where you belong. When you know you belong, everything changes: your worth is not at stake in every conversation.",
    action: "¿En qué áreas de tu vida sientes que tienes que ganarte tu lugar? Reflexiona: ¿es esto verdad o es una creencia aprendida?",
    actionEN: "In what areas of your life do you feel you have to earn your place? Reflect: is this true or is it a learned belief?",
  },
  {
    area: "identidad",
    verse: "Antes que te formase en el vientre te conocí, y antes que nacieses te santifiqué.",
    ref: "Jeremías 1:5",
    theme: "Conocida antes de existir", themeEN: "Known before existing",
    reflection: "Fuiste conocida antes de ser vista. Eso significa que tu valor precede a tus logros, a tus decisiones, a tus errores. Ya eras valiosa antes de hacer nada.",
    reflectionEN: "You were known before you were seen. That means your worth precedes your achievements, your decisions, your mistakes. You were already valuable before doing anything.",
    action: "Hoy, cuando notes el impulso de tener que demostrar tu valor, recuérdate: ya soy. No necesito demostrar nada.",
    actionEN: "Today, when you notice the impulse to prove your worth, remind yourself: I already am. I don't need to prove anything.",
  },
  {
    area: "identidad",
    verse: "Mas a todos los que le recibieron, les dio potestad de ser llamados hijos de Dios.",
    ref: "Juan 1:12",
    theme: "Autoridad de identidad", themeEN: "Identity authority",
    reflection: "Hay una autoridad que nace de saber quién eres. No arrogancia — autoridad. La diferencia es que una necesita demostrar y la otra solo necesita ser.",
    reflectionEN: "There is an authority that comes from knowing who you are. Not arrogance — authority. The difference is that one needs to prove and the other only needs to be.",
    action: "Observa hoy en qué momentos cedes tu autoridad interior. ¿Cuándo te achicas para que otros se sientan cómodos?",
    actionEN: "Observe today in which moments you give up your inner authority. When do you make yourself small so others feel comfortable?",
  },
  {
    area: "identidad",
    verse: "Vosotros sois la luz del mundo.",
    ref: "Mateo 5:14",
    theme: "Luz y visibilidad", themeEN: "Light and visibility",
    reflection: "La luz no pide permiso para brillar. Pero muchas de nosotras hemos aprendido a atenuarla para no molestar, no destacar, no provocar. Eso también es una forma de oscuridad.",
    reflectionEN: "Light doesn't ask permission to shine. But many of us have learned to dim it so as not to bother, not stand out, not provoke. That too is a form of darkness.",
    action: "¿En qué área de tu vida te has estado apagando? Hoy, enciéndete un poco más. Aunque dé miedo.",
    actionEN: "In what area of your life have you been dimming yourself? Today, shine a little more. Even if it's scary.",
  },
  {
    area: "identidad",
    verse: "Nos escogió en él antes de la fundación del mundo, para que fuésemos santos y sin mancha delante de él.",
    ref: "Efesios 1:4",
    theme: "Elegida de antemano", themeEN: "Chosen beforehand",
    reflection: "Ser elegida no es ser perfecta — es ser vista y querida tal y como eres, con tus fracturas y tu belleza simultánea. Eso es lo que significa ser elegida.",
    reflectionEN: "Being chosen is not being perfect — it is being seen and wanted exactly as you are, with your fractures and your beauty simultaneously. That is what it means to be chosen.",
    action: "Escribe una carta breve a tu yo de hace diez años. Dile lo que necesitaba escuchar entonces.",
    actionEN: "Write a brief letter to your self from ten years ago. Tell her what she needed to hear then.",
  },

  // ── CUERPO ────────────────────────────────────
  {
    area: "cuerpo",
    verse: "¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros?",
    ref: "1 Corintios 6:19",
    theme: "El cuerpo como templo", themeEN: "The body as temple",
    reflection: "Cuidar tu cuerpo no es vanidad — es mayordomía. Lo que comes, cómo descansas, cómo te mueves, son actos espirituales cuando los haces con conciencia.",
    reflectionEN: "Caring for your body is not vanity — it is stewardship. What you eat, how you rest, how you move, are spiritual acts when done with consciousness.",
    action: "Elige hoy un acto concreto de cuidado hacia tu cuerpo: movimiento, descanso, agua, respiración consciente.",
    actionEN: "Choose one concrete act of care for your body today: movement, rest, water, conscious breathing.",
  },
  {
    area: "cuerpo",
    verse: "Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud.",
    ref: "3 Juan 1:2",
    theme: "Salud integral", themeEN: "Integral health",
    reflection: "El bienestar físico y el espiritual no están separados. Cómo te habitas en tu cuerpo refleja cómo te relacionas contigo misma en todos los niveles.",
    reflectionEN: "Physical and spiritual wellbeing are not separate. How you inhabit your body reflects how you relate to yourself at all levels.",
    action: "Haz hoy un chequeo de tu cuerpo: ¿dónde hay tensión? ¿Dónde hay comodidad? ¿Qué te está diciendo?",
    actionEN: "Do a body check-in today: where is there tension? Where is there comfort? What is it telling you?",
  },
  {
    area: "cuerpo",
    verse: "Presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional.",
    ref: "Romanos 12:1",
    theme: "El cuerpo como ofrenda", themeEN: "The body as offering",
    reflection: "Tu cuerpo no es un obstáculo para tu vida espiritual — es el vehículo de ella. Habitarlo plenamente, con presencia y gratitud, es una forma de adoración.",
    reflectionEN: "Your body is not an obstacle to your spiritual life — it is the vehicle of it. Inhabiting it fully, with presence and gratitude, is a form of worship.",
    action: "Toca tu corazón con la mano y siente los latidos por un minuto. Agradece cada uno. Tu cuerpo trabaja por ti sin descanso.",
    actionEN: "Place your hand on your heart and feel the beats for one minute. Give thanks for each one. Your body works for you without rest.",
  },
  {
    area: "cuerpo",
    verse: "El que guarda su boca y su lengua, su alma guarda de angustias.",
    ref: "Proverbios 21:23",
    theme: "Cuerpo y palabra", themeEN: "Body and word",
    reflection: "La ciencia del estrés confirma que las palabras tienen efectos físicos en el cuerpo. Lo que te dices, con qué tono te hablas, afecta directamente tu sistema nervioso.",
    reflectionEN: "The science of stress confirms that words have physical effects on the body. What you tell yourself, with what tone you speak to yourself, directly affects your nervous system.",
    action: "Hoy, habla a tu cuerpo con gentileza. En especial a las partes que normalmente criticas.",
    actionEN: "Today, speak to your body with gentleness. Especially to the parts you usually criticize.",
  },
  {
    area: "cuerpo",
    verse: "Pues aún vuestros cabellos están todos contados.",
    ref: "Lucas 12:7",
    theme: "Cuidado divino del cuerpo", themeEN: "Divine care for the body",
    reflection: "Dios conoce tu cuerpo mejor que tú. No hay detalle de ti que le sea ajeno o insignificante. Esa atención divina es una invitación a que tú también te prestes esa atención.",
    reflectionEN: "God knows your body better than you do. There is no detail of you that is foreign or insignificant to God. That divine attention is an invitation for you to also give yourself that attention.",
    action: "Haz algo hoy que sea solo para nutrir tu cuerpo sin agenda de productividad: un baño largo, un estiramiento, un descanso.",
    actionEN: "Do something today just to nourish your body without a productivity agenda: a long bath, a stretch, a rest.",
  },
  {
    area: "cuerpo",
    verse: "Pues para mí el vivir es Cristo, y el morir es ganancia.",
    ref: "Filipenses 1:21",
    theme: "Presencia plena en el cuerpo", themeEN: "Full presence in the body",
    reflection: "Vivir plenamente en el cuerpo que tienes — no en el cuerpo que quisieras o tendrás — es una práctica espiritual. La encarnación es un regalo que se recibe en el presente.",
    reflectionEN: "Living fully in the body you have — not the body you wish for or will have — is a spiritual practice. Embodiment is a gift received in the present.",
    action: "Hoy, haz una actividad física que genuinamente disfrutes, no que 'debas' hacer. Muévete por placer.",
    actionEN: "Today, do a physical activity you genuinely enjoy, not one you 'should' do. Move for pleasure.",
  },
  {
    area: "cuerpo",
    verse: "El Señor es la fortaleza de mi vida.",
    ref: "Salmo 27:1",
    theme: "Fortaleza y energía", themeEN: "Strength and energy",
    reflection: "Hay días donde la energía física escasea. En esos momentos, la fortaleza no viene de adrenalina — viene de recordar quién eres y por qué te levantas.",
    reflectionEN: "There are days when physical energy is scarce. In those moments, strength does not come from adrenaline — it comes from remembering who you are and why you get up.",
    action: "¿Estás descansando lo suficiente? Esta semana, duerme una hora más de lo que crees que 'tienes permitido'.",
    actionEN: "Are you resting enough? This week, sleep one hour more than you think you're 'allowed' to.",
  },
  {
    area: "cuerpo",
    verse: "Tuyo es el día, tuya también la noche.",
    ref: "Salmo 74:16",
    theme: "Ritmos naturales", themeEN: "Natural rhythms",
    reflection: "El cuerpo fue diseñado con ritmos: el ritmo del sueño, del alimento, del descanso, del esfuerzo. Vivir contra esos ritmos tiene un costo. Honrarlos es honrar el diseño original.",
    reflectionEN: "The body was designed with rhythms: the rhythm of sleep, food, rest, effort. Living against those rhythms has a cost. Honoring them is honoring the original design.",
    action: "Observa hoy a qué hora tu energía sube y baja naturalmente. ¿Estás diseñando tu día respetando esos ritmos?",
    actionEN: "Observe today at what times your energy naturally rises and falls. Are you designing your day to respect those rhythms?",
  },
];

/* ── Función determinista: versículo para el día n ── */
function getDevocional(dayNum: number): Devotional {
  const idx = ((dayNum - 1) % VERSE_BANK.length + VERSE_BANK.length) % VERSE_BANK.length;
  return VERSE_BANK[idx];
}

/* ══════════════════════════════════════════════
   UI HELPERS
══════════════════════════════════════════════ */
function GeoGrid({ opacity = 0.07 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ opacity }}>
      {Array.from({ length: 14 }).map((_, i) => (
        <line key={`v${i}`} x1={`${(i/13)*100}%`} y1="0" x2={`${(i/13)*100}%`} y2="100%" stroke="#928178" strokeWidth="0.5"/>
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={`${(i/7)*100}%`} x2="100%" y2={`${(i/7)*100}%`} stroke="#928178" strokeWidth="0.5"/>
      ))}
    </svg>
  );
}

/* Gradient visual para cada área (reemplaza imagen real) */
function AreaGradient({ area, size = 320 }: { area: Area; size?: number }) {
  const a = AREAS[area];
  return (
    <div
      style={{
        width: "100%", height: size,
        background: `radial-gradient(ellipse 80% 70% at 30% 40%, ${a.gB}CC, ${a.gA})`,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Pattern lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={`${(i/7)*120-10}%`} y1="0" x2={`${(i/7)*120-10}%`} y2="100%" stroke="#fff" strokeWidth="0.8"/>
        ))}
      </svg>
      {/* Area watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: 0.08 }}
      >
        <span style={{ fontSize: "120px", color: "#fff", fontFamily: "var(--font-am-display)", fontWeight: 300 }}>
          {AREAS[area].label[0]}
        </span>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════
   FEATURED DEVOTIONAL CARD
══════════════════════════════════════════════ */
function FeaturedCard({ dayNum, isToday, lang }: { dayNum: number; isToday: boolean; lang: string }) {
  const es   = lang === "es";
  const dev  = getDevocional(dayNum);
  const area = AREAS[dev.area];
  const date = dateForDay(dayNum);
  const dateStr = date.toLocaleDateString(es ? "es-ES" : "en-US", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div
      className="overflow-hidden"
      style={{ backgroundColor: "#111111", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* Image area */}
      <div className="relative">
        <AreaGradient area={dev.area} size={340} />
        {/* Top badges */}
        <div className="absolute top-5 left-5 flex items-center gap-2">
          <span
            className="px-3 py-1 text-[9px] uppercase tracking-[0.22em] font-body font-semibold"
            style={{ backgroundColor: area.color, color: "#fff" }}
          >
            {es ? area.label : area.labelEN}
          </span>
          {isToday && (
            <span
              className="px-3 py-1 text-[9px] uppercase tracking-[0.22em] font-body font-semibold"
              style={{ backgroundColor: "rgba(249,244,241,0.15)", color: "#F9F4F1", border: "1px solid rgba(249,244,241,0.25)" }}
            >
              {es ? "Hoy" : "Today"}
            </span>
          )}
        </div>
        {/* Day number */}
        <div className="absolute bottom-5 right-5">
          <span
            className="font-body text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            {es ? `Día ${dayNum} de ${TOTAL_DAYS}` : `Day ${dayNum} of ${TOTAL_DAYS}`}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 lg:p-10 space-y-6">
        {/* Date */}
        <p className="text-[10px] uppercase tracking-[0.25em] font-body" style={{ color: area.color }}>
          {dateStr}
        </p>

        {/* Verse */}
        <div className="space-y-2">
          <blockquote
            className="font-display italic leading-[1.5]"
            style={{
              fontSize:   "clamp(18px, 2.2vw, 26px)",
              fontWeight: 300,
              color:      "#F9F4F1",
              letterSpacing: "0.01em",
            }}
          >
            "{dev.verse}"
          </blockquote>
          <p
            className="text-[11px] font-body uppercase tracking-[0.2em]"
            style={{ color: area.color }}
          >
            — {dev.ref}
          </p>
        </div>

        {/* Theme */}
        <div className="w-8 h-px" style={{ backgroundColor: area.color, opacity: 0.6 }} />
        <p
          className="font-body font-semibold text-[13px] uppercase tracking-[0.12em]"
          style={{ color: "rgba(249,244,241,0.6)" }}
        >
          {es ? dev.theme : dev.themeEN}
        </p>

        {/* Reflection */}
        <p
          className="font-body text-[15px] leading-[1.85]"
          style={{ color: "rgba(249,244,241,0.72)" }}
        >
          {es ? dev.reflection : dev.reflectionEN}
        </p>

        {/* Action */}
        <div
          className="p-5 space-y-2"
          style={{
            backgroundColor: `${area.color}18`,
            border: `1px solid ${area.color}30`,
          }}
        >
          <p className="text-[9px] uppercase tracking-[0.28em] font-body font-semibold" style={{ color: area.color }}>
            {es ? "Acción del día" : "Today's action"}
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(249,244,241,0.65)" }}>
            {es ? dev.action : dev.actionEN}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/membresia"
            className="inline-flex items-center gap-2 px-6 py-3 text-[11px] uppercase tracking-[0.12em] font-body font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: area.color, color: "#fff" }}
          >
            {es ? "Leer completo" : "Read full"}
            <span>→</span>
          </Link>
          <span
            className="text-[10px] font-body"
            style={{ color: "rgba(249,244,241,0.25)" }}
          >
            {es ? "Requiere membresía" : "Membership required"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   DAY STRIP — week view
══════════════════════════════════════════════ */
function DayStrip({
  centerDay, todayDay, selectedDay, onSelect, lang,
}: {
  centerDay: number; todayDay: number; selectedDay: number;
  onSelect: (d: number) => void; lang: string;
}) {
  const es    = lang === "es";
  const days  = [-3, -2, -1, 0, 1, 2, 3].map((offset) => centerDay + offset);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {days.map((d) => {
        if (d < 1 || d > TOTAL_DAYS) return null;
        const date    = dateForDay(d);
        const dev     = getDevocional(d);
        const area    = AREAS[dev.area];
        const isToday = d === todayDay;
        const isPast  = d < todayDay;
        const isSel   = d === selectedDay;
        const locked  = d > todayDay;
        const dayName = date.toLocaleDateString(es ? "es-ES" : "en-US", { weekday: "short" });
        const dayNum  = date.getDate();

        return (
          <button
            key={d}
            onClick={() => !locked && onSelect(d)}
            className="flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-3 transition-all duration-200"
            style={{
              width: "72px",
              backgroundColor: isSel ? area.color : locked ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${isSel ? area.color : isToday ? "rgba(249,244,241,0.25)" : "rgba(255,255,255,0.08)"}`,
              opacity: locked ? 0.35 : isPast && !isSel ? 0.7 : 1,
              cursor: locked ? "not-allowed" : "pointer",
            }}
          >
            <span
              className="text-[9px] uppercase tracking-[0.15em] font-body"
              style={{ color: isSel ? "rgba(255,255,255,0.7)" : "rgba(249,244,241,0.35)" }}
            >
              {dayName}
            </span>
            <span
              className="font-display text-lg leading-none"
              style={{ color: isSel ? "#fff" : "rgba(249,244,241,0.8)", fontWeight: 300 }}
            >
              {dayNum}
            </span>
            {locked ? (
              <span style={{ color: "rgba(249,244,241,0.3)" }}><LockIcon /></span>
            ) : (
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: isSel ? "rgba(255,255,255,0.6)" : area.color }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ══════════════════════════════════════════════
   ACCORDION FAQ
══════════════════════════════════════════════ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b cursor-pointer select-none"
      style={{ borderColor: "rgba(146,129,120,0.2)" }}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between py-6 gap-4">
        <h3 className="font-body text-[15px] leading-snug" style={{ color: "#000", fontWeight: open ? 600 : 400 }}>{q}</h3>
        <span className="flex-shrink-0 text-xl transition-transform duration-200" style={{ color: "#54132B", transform: open ? "rotate(45deg)" : "none", fontWeight: 300 }}>+</span>
      </div>
      {open && <p className="font-body text-sm leading-relaxed pb-6" style={{ color: "#928178" }}>{a}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════ */
export default function DevocionalesPage() {
  const { lang } = useLang();
  const es = lang === "es";

  /* Day calculations */
  const today    = useMemo(() => new Date(), []);
  const todayDay = useMemo(() => Math.max(1, Math.min(TOTAL_DAYS, getDayNumber(today))), [today]);

  const [selectedDay, setSelectedDay] = useState(todayDay);
  const [centerDay, setCenterDay]     = useState(todayDay);

  const progress = Math.round((todayDay / TOTAL_DAYS) * 100 * 10) / 10;

  const handlePrevWeek = () => {
    const next = Math.max(1, centerDay - 7);
    setCenterDay(next);
    if (next <= todayDay) setSelectedDay(next);
  };
  const handleNextWeek = () => {
    const next = Math.min(TOTAL_DAYS, centerDay + 7);
    if (next <= todayDay) { setCenterDay(next); setSelectedDay(next); }
  };

  const faqES = [
    { q: "¿Con qué frecuencia llegan los devocionales?", a: "Hay un devocional por cada día del año — 365 en total. Se desbloquea uno nuevo cada día a medianoche." },
    { q: "¿Puedo ver los devocionales de días anteriores?", a: "Sí. Todos los días pasados están disponibles para miembros. Puedes navegar por el historial completo." },
    { q: "¿Necesito membresía para acceder?", a: "Puedes ver la vista previa de cada devocional sin membresía. Para leer el texto completo y la reflexión extendida necesitas ser miembro del Círculo." },
    { q: "¿Los versículos están en español?", a: "Sí. Todos los versículos son en español, tomados de la Reina Valera y otras versiones en castellano." },
    { q: "¿Qué áreas de vida cubre la jornada?", a: "Cubre 8 áreas: Pensamientos, Emociones, Acciones, Espíritu, Vínculos, Propósito, Identidad y Cuerpo — rotando a lo largo de los 365 días del año." },
  ];
  const faqEN = [
    { q: "How often do devotionals unlock?", a: "There is one devotional for each day of the year — 365 total. A new one unlocks every day at midnight." },
    { q: "Can I view previous days' devotionals?", a: "Yes. All past days are available to members. You can browse the complete history." },
    { q: "Do I need a membership to access?", a: "You can preview each devotional without membership. To read the full text and extended reflection you need to be a Circle member." },
    { q: "What language are the verses in?", a: "Spanish. All verses are in Spanish, taken from Reina Valera and other Spanish translations." },
    { q: "What life areas does the journey cover?", a: "It covers 8 areas: Thoughts, Emotions, Actions, Spirit, Relationships, Purpose, Identity and Body — rotating across the 365 days of the year." },
  ];

  return (
    <div style={{ backgroundColor: "#F9F4F1", color: "#000" }}>

      {/* ══ 1. HERO ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A0A0A", minHeight: "80vh" }}>
        <GeoGrid opacity={0.08} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(84,19,43,0.2), transparent 70%)" }}/>

        <div className="relative z-10 max-w-[860px] mx-auto px-6 flex flex-col items-center justify-center text-center min-h-[80vh] gap-8">
          <div className="flex items-center gap-3 px-5 py-2" style={{ border: "1px solid rgba(146,129,120,0.22)", backgroundColor: "rgba(249,244,241,0.03)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#54132B" }} />
            <span className="text-[10px] uppercase tracking-[0.28em] font-body" style={{ color: "rgba(249,244,241,0.4)" }}>
              {es ? "Jornada anual · 365 devocionales" : "Annual journey · 365 devotionals"}
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="font-display" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 300, color: "#F9F4F1", letterSpacing: "-0.02em", lineHeight: 1.04 }}>
              {es ? "Palabras para" : "Words to"}
            </h1>
            <h1 className="font-display italic" style={{ fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 300, color: "#54132B", letterSpacing: "-0.02em", lineHeight: 1.04 }}>
              {es ? "comenzar bien el día." : "start your day right."}
            </h1>
          </div>

          <p className="font-body font-light max-w-[440px] leading-[1.8]" style={{ fontSize: "16px", color: "rgba(249,244,241,0.45)" }}>
            {es
              ? "365 días. 365 versículos bíblicos poderosos. Una jornada anual completa conectada con tus emociones, pensamientos, acciones y todas las áreas integrales de tu vida."
              : "365 days. 365 powerful biblical verses. A complete annual journey connected with your emotions, thoughts, actions and all integral areas of your life."}
          </p>

          {/* Progress */}
          <div className="w-full max-w-[400px] space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-[0.2em] font-body" style={{ color: "rgba(249,244,241,0.3)" }}>
                {es ? `Día ${todayDay} de ${TOTAL_DAYS.toLocaleString()}` : `Day ${todayDay} of ${TOTAL_DAYS.toLocaleString()}`}
              </span>
              <span className="text-[10px] font-body" style={{ color: "rgba(249,244,241,0.3)" }}>{progress}%</span>
            </div>
            <div className="h-px w-full" style={{ backgroundColor: "rgba(249,244,241,0.08)" }}>
              <div className="h-full transition-all duration-1000" style={{ width: `${progress}%`, backgroundColor: "#54132B" }} />
            </div>
          </div>

          <a href="#jornada" className="inline-flex items-center gap-2 px-8 py-4 text-[12px] uppercase tracking-[0.12em] font-body font-medium transition-opacity hover:opacity-80" style={{ backgroundColor: "#54132B", color: "#F9F4F1" }}>
            {es ? "Ver el devocional de hoy" : "See today's devotional"} ↓
          </a>
        </div>
      </section>

      {/* ══ 2. JORNADA INTERACTIVA ═════════════════════════════ */}
      <section id="jornada" className="relative overflow-hidden py-20 px-6" style={{ backgroundColor: "#0F0F0F" }}>
        <GeoGrid opacity={0.05} />

        <div className="relative z-10 max-w-[900px] mx-auto space-y-8">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] font-body" style={{ color: "#54132B" }}>
                {es ? "La jornada" : "The journey"}
              </p>
              <h2 className="font-display" style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 300, color: "#F9F4F1" }}>
                {es ? "365 días · 8 áreas de vida" : "365 days · 8 life areas"}
              </h2>
            </div>
            {/* Area legend */}
            <div className="flex flex-wrap gap-2">
              {AREA_ORDER.slice(0, 4).map((a) => (
                <div key={a} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AREAS[a].color }} />
                  <span className="text-[9px] uppercase tracking-[0.1em] font-body" style={{ color: "rgba(249,244,241,0.4)" }}>
                    {es ? AREAS[a].label : AREAS[a].labelEN}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Week navigation */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrevWeek}
                disabled={centerDay <= 4}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.12em] font-body transition-opacity hover:opacity-70 disabled:opacity-20"
                style={{ color: "rgba(249,244,241,0.5)", border: "1px solid rgba(249,244,241,0.12)", backgroundColor: "transparent" }}
              >
                ← {es ? "Anterior" : "Previous"}
              </button>

              <button
                onClick={() => { setCenterDay(todayDay); setSelectedDay(todayDay); }}
                className="px-4 py-2 text-[10px] uppercase tracking-[0.14em] font-body transition-opacity hover:opacity-80"
                style={{ color: "#54132B", border: "1px solid rgba(84,19,43,0.4)", backgroundColor: "transparent" }}
              >
                {es ? "Hoy" : "Today"}
              </button>

              <button
                onClick={handleNextWeek}
                disabled={centerDay + 7 > todayDay}
                className="px-4 py-2 text-[11px] uppercase tracking-[0.12em] font-body transition-opacity hover:opacity-70 disabled:opacity-20"
                style={{ color: "rgba(249,244,241,0.5)", border: "1px solid rgba(249,244,241,0.12)", backgroundColor: "transparent" }}
              >
                {es ? "Siguiente" : "Next"} →
              </button>
            </div>

            <DayStrip
              centerDay={centerDay}
              todayDay={todayDay}
              selectedDay={selectedDay}
              onSelect={(d) => setSelectedDay(d)}
              lang={lang}
            />
          </div>

          {/* Featured card */}
          <FeaturedCard dayNum={selectedDay} isToday={selectedDay === todayDay} lang={lang} />

          {/* All areas preview */}
          <div className="pt-4">
            <p className="text-[10px] uppercase tracking-[0.28em] font-body mb-4" style={{ color: "rgba(249,244,241,0.3)" }}>
              {es ? "8 áreas de fortalecimiento integral" : "8 areas of integral strengthening"}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {AREA_ORDER.map((areaKey) => (
                <div
                  key={areaKey}
                  className="p-4 space-y-1"
                  style={{
                    backgroundColor: `${AREAS[areaKey].color}18`,
                    border: `1px solid ${AREAS[areaKey].color}30`,
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: AREAS[areaKey].color }} />
                  <p className="font-body text-[12px] font-semibold" style={{ color: "#F9F4F1" }}>
                    {es ? AREAS[areaKey].label : AREAS[areaKey].labelEN}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. SUSCRIPCIÓN ═════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 px-6" style={{ backgroundColor: "#0A0A0A" }}>
        <GeoGrid opacity={0.06} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(84,19,43,0.18), transparent 70%)" }}/>

        <div className="relative z-10 max-w-[540px] mx-auto space-y-8 text-center">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.35em] font-body" style={{ color: "rgba(249,244,241,0.35)" }}>
              {es ? "Únete a la jornada" : "Join the journey"}
            </p>
            <h2 className="font-display" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#F9F4F1", lineHeight: 1.15 }}>
              {es ? "Recibe cada devocional\nen tu correo." : "Receive each devotional\nin your inbox."}
            </h2>
          </div>

          <div className="flex items-center justify-between px-6 py-5" style={{ border: "1px solid rgba(84,19,43,0.35)", backgroundColor: "rgba(84,19,43,0.06)" }}>
            <div className="text-left space-y-1">
              <p className="font-body text-sm font-semibold" style={{ color: "#F9F4F1" }}>{es ? "Devocionales Diarios" : "Daily Devotionals"}</p>
              <p className="font-body text-[11px]" style={{ color: "rgba(249,244,241,0.35)" }}>{es ? "365 días · 8 áreas · Cancela cuando quieras" : "365 days · 8 areas · Cancel anytime"}</p>
            </div>
            <div className="text-right">
              <p className="font-display font-light" style={{ fontSize: "28px", color: "#F9F4F1", lineHeight: 1 }}>$9</p>
              <p className="font-body text-[10px]" style={{ color: "rgba(249,244,241,0.3)" }}>{es ? "/mes" : "/month"}</p>
            </div>
          </div>

          <div className="flex gap-0">
            <input
              type="email"
              placeholder={es ? "tu@correo.com" : "your@email.com"}
              className="flex-1 px-5 py-4 text-sm font-body outline-none"
              style={{ backgroundColor: "rgba(249,244,241,0.05)", border: "1px solid rgba(249,244,241,0.12)", borderRight: "none", color: "#F9F4F1" }}
            />
            <Link
              href="/membresia"
              className="px-6 py-4 text-[11px] font-body font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 flex-shrink-0 inline-flex items-center"
              style={{ backgroundColor: "#54132B", color: "#F9F4F1" }}
            >
              {es ? "Comenzar" : "Start"}
            </Link>
          </div>
          <p className="text-[10px] font-body" style={{ color: "rgba(249,244,241,0.2)" }}>
            {es ? "Pago seguro · Sin compromisos mínimos" : "Secure payment · No minimum commitments"}
          </p>
        </div>
      </section>

      {/* ══ 4. FAQ ═════════════════════════════════════════════ */}
      <section className="py-24 px-6" style={{ backgroundColor: "#F9F4F1" }}>
        <div className="max-w-[720px] mx-auto space-y-12">
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.35em] font-body font-semibold" style={{ color: "#54132B" }}>
              {es ? "Preguntas frecuentes" : "FAQ"}
            </p>
            <div className="w-8 h-px" style={{ backgroundColor: "#54132B", opacity: 0.4 }} />
            <h2 className="font-display" style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "#000" }}>
              {es ? "Lo que más preguntan" : "Most asked questions"}
            </h2>
          </div>
          <div>
            {(es ? faqES : faqEN).map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
          <div className="flex items-center justify-between p-8" style={{ backgroundColor: "#F4E7E9", border: "1px solid rgba(146,129,120,0.15)" }}>
            <div className="space-y-1">
              <p className="font-display text-lg font-light" style={{ color: "#000" }}>{es ? "¿Más preguntas?" : "More questions?"}</p>
              <p className="font-body text-sm" style={{ color: "#928178" }}>{es ? "Estamos aquí." : "We're here."}</p>
            </div>
            <Link href="/contacto" className="px-6 py-3 text-[11px] font-body font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-80 inline-flex items-center" style={{ backgroundColor: "#54132B", color: "#F9F4F1" }}>
              {es ? "Contáctanos" : "Contact"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
