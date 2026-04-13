"use client";

import Link from "next/link";
import { useLang } from "@/app/providers/LangProvider";

/* ── Section data ──────────────────────────────── */

interface Section {
  title: string;
  content: (string | { subtitle: string; text: string } | { list: string[] })[];
}

function getSections(lang: "es" | "en"): Section[] {
  if (lang === "es") {
    return [
      {
        title: "1. Introduccion y Responsable del Tratamiento",
        content: [
          "La presente Politica de Privacidad describe como AutenticaMente (en adelante, \"la Plataforma\"), operada por la Dra. Liset Valencia Medina, psicologa clinica, recopila, utiliza, almacena y protege la informacion personal de los usuarios que acceden a nuestro sitio web, aplicaciones y servicios digitales.",
          "AutenticaMente es un centro de transformacion psicoespiritual que ofrece membresias, contenido digital, conferencias y consultas clinicas. Nos comprometemos a proteger la privacidad de nuestros usuarios de conformidad con la legislacion colombiana (Ley 1581 de 2012 y Decreto 1377 de 2013), el Reglamento General de Proteccion de Datos de la Union Europea (RGPD/GDPR) y la Ley de Privacidad del Consumidor de California (CCPA), segun corresponda.",
          {
            subtitle: "Responsable del Tratamiento de Datos",
            text: "Nombre: Dra. Liset Valencia Medina / AutenticaMente\nCorreo electronico: contacto@autenticamente.com\nWhatsApp: +57 310 531 2817\nUbicacion: Colombia",
          },
        ],
      },
      {
        title: "2. Informacion que Recopilamos",
        content: [
          "Recopilamos diferentes tipos de informacion dependiendo de como interactues con la Plataforma:",
          {
            subtitle: "2.1 Datos personales proporcionados directamente",
            text: "Cuando te registras, adquieres una membresia, compras contenido digital, agendas una consulta o nos contactas, podemos recopilar:",
          },
          {
            list: [
              "Nombre completo",
              "Direccion de correo electronico",
              "Numero de telefono o WhatsApp",
              "Pais y ciudad de residencia",
              "Informacion de perfil (foto, preferencias)",
              "Respuestas al test emocional",
              "Mensajes enviados a traves de formularios de contacto o el chat con inteligencia artificial",
            ],
          },
          {
            subtitle: "2.2 Datos de pago",
            text: "Los pagos se procesan a traves de Stripe, un proveedor de servicios de pago de terceros. AutenticaMente NO almacena numeros de tarjeta de credito ni datos bancarios completos. Stripe procesa y almacena estos datos de acuerdo con los estandares PCI DSS. Para mas informacion, consulta la politica de privacidad de Stripe en https://stripe.com/privacy.",
          },
          {
            subtitle: "2.3 Datos de uso y navegacion",
            text: "Recopilamos automaticamente informacion tecnica cuando navegas por la Plataforma:",
          },
          {
            list: [
              "Direccion IP y ubicacion aproximada",
              "Tipo de navegador y sistema operativo",
              "Paginas visitadas, tiempo de permanencia y patrones de navegacion",
              "Fuente de referencia (como llegaste a nuestro sitio)",
              "Identificadores de dispositivo",
            ],
          },
          {
            subtitle: "2.4 Datos de cookies y tecnologias similares",
            text: "Utilizamos cookies y tecnologias de seguimiento para mejorar la experiencia del usuario, analizar el trafico y personalizar el contenido. Consulta la seccion 9 de esta politica para mas detalles.",
          },
        ],
      },
      {
        title: "3. Como Utilizamos tu Informacion",
        content: [
          "Utilizamos la informacion recopilada para los siguientes fines:",
          {
            list: [
              "Prestacion del servicio: Gestionar tu cuenta, procesar pagos, entregar contenido digital, gestionar membresias y agendar consultas.",
              "Comunicacion: Enviarte confirmaciones de compra, recordatorios, actualizaciones de servicio y, cuando lo autorices, contenido promocional y newsletters.",
              "Personalizacion: Adaptar recomendaciones de contenido, programas y recursos basandonos en tu perfil emocional y preferencias.",
              "Asistente de inteligencia artificial: Nuestro chat utiliza la API de OpenAI para ofrecerte orientacion personalizada. Los mensajes que envias al asistente se procesan a traves de OpenAI para generar respuestas. No utilizamos estos datos para entrenar modelos de IA.",
              "Analisis y mejora: Comprender como se utiliza la Plataforma para mejorar nuestros servicios, contenido y experiencia de usuario.",
              "Seguridad: Detectar y prevenir fraude, acceso no autorizado y otras actividades ilicitas.",
              "Obligaciones legales: Cumplir con requisitos legales, regulatorios y fiscales aplicables.",
            ],
          },
        ],
      },
      {
        title: "4. Base Legal para el Tratamiento",
        content: [
          "El tratamiento de tus datos personales se fundamenta en las siguientes bases legales:",
          {
            list: [
              "Consentimiento: Al registrarte en la Plataforma, aceptar esta politica de privacidad y autorizar el tratamiento de tus datos. Puedes revocar tu consentimiento en cualquier momento.",
              "Ejecucion de contrato: El tratamiento es necesario para la prestacion de los servicios contratados, incluyendo membresias, acceso a contenido digital y consultas.",
              "Interes legitimo: Para mejorar nuestros servicios, garantizar la seguridad de la Plataforma y prevenir el fraude.",
              "Obligacion legal: Cuando el tratamiento sea necesario para cumplir con obligaciones legales o regulatorias aplicables en Colombia u otras jurisdicciones.",
            ],
          },
        ],
      },
      {
        title: "5. Comparticion de Datos y Terceros",
        content: [
          "No vendemos, alquilamos ni comercializamos tu informacion personal. Sin embargo, compartimos datos con los siguientes terceros de confianza, exclusivamente para los fines descritos:",
          {
            list: [
              "Stripe: Procesamiento seguro de pagos. Stripe actua como procesador de datos independiente. (https://stripe.com/privacy)",
              "OpenAI: Procesamiento de mensajes del asistente de inteligencia artificial. OpenAI procesa los datos de acuerdo con su politica de uso de datos empresariales, la cual establece que los datos no se utilizan para entrenar sus modelos. (https://openai.com/policies/privacy-policy)",
              "Vercel: Alojamiento de la Plataforma e infraestructura. (https://vercel.com/legal/privacy-policy)",
              "Proveedor de correo electronico: Para el envio de correos transaccionales y de marketing autorizados.",
              "Google Analytics u otras herramientas de analisis: Para comprender patrones de uso y mejorar la Plataforma.",
            ],
          },
          "En caso de que AutenticaMente participe en una fusion, adquisicion o venta de activos, tus datos personales podrian transferirse como parte de dicha transaccion, previa notificacion.",
        ],
      },
      {
        title: "6. Transferencias Internacionales de Datos",
        content: [
          "Dado que AutenticaMente opera desde Colombia y sirve a usuarios internacionales, tus datos personales pueden transferirse y procesarse en paises diferentes al tuyo, incluyendo Estados Unidos (donde operan Stripe, OpenAI y Vercel).",
          "Estas transferencias se realizan con las garantias adecuadas, incluyendo clausulas contractuales tipo aprobadas por las autoridades competentes y el cumplimiento de marcos legales aplicables como el RGPD para usuarios en el Espacio Economico Europeo.",
          "Al utilizar nuestra Plataforma, aceptas estas transferencias internacionales de datos conforme a las salvaguardas descritas en esta politica.",
        ],
      },
      {
        title: "7. Retencion de Datos",
        content: [
          "Conservamos tus datos personales solo durante el tiempo necesario para cumplir con los fines para los que fueron recopilados:",
          {
            list: [
              "Datos de cuenta: Mientras mantengas una cuenta activa y durante un periodo razonable posterior a la cancelacion para fines administrativos y legales.",
              "Datos de transacciones: De acuerdo con los requisitos legales y fiscales aplicables en Colombia (minimo 5 anos para efectos contables y tributarios).",
              "Datos de uso y analitica: Hasta 26 meses en forma agregada y anonimizada.",
              "Comunicaciones y mensajes del chat de IA: Hasta 90 dias despues de la interaccion, salvo que se requiera un periodo mayor por razones legales.",
              "Datos de cookies: Segun los periodos especificados en nuestra configuracion de cookies (consulta la seccion 9).",
            ],
          },
          "Una vez que los datos ya no sean necesarios, seran eliminados o anonimizados de forma segura.",
        ],
      },
      {
        title: "8. Tus Derechos",
        content: [
          "De acuerdo con la legislacion aplicable, tienes los siguientes derechos sobre tus datos personales:",
          {
            subtitle: "8.1 Derechos conforme a la Ley Colombiana (Ley 1581 de 2012)",
            text: "",
          },
          {
            list: [
              "Derecho de acceso: Conocer, actualizar y rectificar tus datos personales.",
              "Derecho de supresion: Solicitar la eliminacion de tus datos cuando no sean necesarios para las finalidades autorizadas.",
              "Derecho de revocacion: Revocar la autorizacion otorgada para el tratamiento de tus datos.",
              "Derecho de consulta: Consultar de forma gratuita tus datos personales al menos una vez cada mes calendario.",
              "Derecho de reclamo: Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) cuando consideres que tus derechos han sido vulnerados.",
            ],
          },
          {
            subtitle: "8.2 Derechos conforme al RGPD (para usuarios en el EEE)",
            text: "",
          },
          {
            list: [
              "Derecho de acceso: Obtener una copia de tus datos personales.",
              "Derecho de rectificacion: Corregir datos inexactos o incompletos.",
              "Derecho de supresion (derecho al olvido): Solicitar la eliminacion de tus datos en determinadas circunstancias.",
              "Derecho de limitacion: Restringir el tratamiento de tus datos en determinados supuestos.",
              "Derecho de portabilidad: Recibir tus datos en un formato estructurado, de uso comun y lectura mecanica.",
              "Derecho de oposicion: Oponerte al tratamiento de tus datos por motivos relacionados con tu situacion particular.",
              "Derecho a no ser objeto de decisiones automatizadas: Incluyendo la elaboracion de perfiles con efectos juridicos o similares.",
            ],
          },
          {
            subtitle: "8.3 Derechos conforme a la CCPA (para residentes de California)",
            text: "",
          },
          {
            list: [
              "Derecho a saber que datos personales se recopilan, utilizan y comparten.",
              "Derecho a solicitar la eliminacion de tus datos personales.",
              "Derecho a no ser discriminado por ejercer tus derechos de privacidad.",
              "AutenticaMente no vende informacion personal de sus usuarios.",
            ],
          },
          "Para ejercer cualquiera de estos derechos, contactanos a traves de contacto@autenticamente.com o WhatsApp: +57 310 531 2817. Responderemos a tu solicitud dentro de los plazos legales aplicables (15 dias habiles conforme a la ley colombiana, 30 dias conforme al RGPD).",
        ],
      },
      {
        title: "9. Cookies y Tecnologias de Seguimiento",
        content: [
          "Utilizamos cookies y tecnologias similares para los siguientes propositos:",
          {
            list: [
              "Cookies esenciales: Necesarias para el funcionamiento de la Plataforma, como la autenticacion de usuario y la seguridad de la sesion.",
              "Cookies de rendimiento: Recopilan informacion anonima sobre como los usuarios interactuan con la Plataforma, permitiendonos mejorar su funcionamiento.",
              "Cookies de funcionalidad: Permiten recordar tus preferencias (como el idioma seleccionado) para ofrecerte una experiencia personalizada.",
              "Cookies de marketing: Utilizadas para mostrar contenido relevante y medir la efectividad de nuestras campanas. Estas cookies solo se activan con tu consentimiento previo.",
            ],
          },
          "Puedes configurar tu navegador para rechazar todas las cookies o para que te avise cuando se envie una cookie. Ten en cuenta que si desactivas las cookies, algunas funcionalidades de la Plataforma podrian no estar disponibles.",
        ],
      },
      {
        title: "10. Privacidad de Menores de Edad",
        content: [
          "Los servicios de AutenticaMente estan dirigidos exclusivamente a personas mayores de 18 anos. No recopilamos intencionalmente informacion personal de menores de edad.",
          "Si eres padre, madre o tutor legal y consideras que un menor bajo tu responsabilidad nos ha proporcionado datos personales, contactanos inmediatamente a traves de contacto@autenticamente.com para que procedamos a eliminar dicha informacion.",
          "En el caso de que tengamos conocimiento de que hemos recopilado datos de un menor sin la autorizacion adecuada, eliminaremos dicha informacion de forma inmediata.",
        ],
      },
      {
        title: "11. Cambios en esta Politica",
        content: [
          "Nos reservamos el derecho de modificar esta Politica de Privacidad en cualquier momento. Cualquier cambio sustancial sera notificado a traves de:",
          {
            list: [
              "Un aviso destacado en la Plataforma.",
              "Un correo electronico a la direccion asociada a tu cuenta.",
              "La actualizacion de la fecha de \"Ultima modificacion\" en la parte superior de esta pagina.",
            ],
          },
          "Te recomendamos revisar esta politica periodicamente. El uso continuado de la Plataforma despues de la publicacion de los cambios constituye la aceptacion de la politica modificada.",
        ],
      },
      {
        title: "12. Contacto",
        content: [
          "Si tienes preguntas, inquietudes o solicitudes relacionadas con esta Politica de Privacidad o el tratamiento de tus datos personales, puedes contactarnos a traves de los siguientes medios:",
          {
            list: [
              "Correo electronico: contacto@autenticamente.com",
              "WhatsApp: +57 310 531 2817",
              "Instagram: @lisetvalenciam",
            ],
          },
          "Para usuarios en el Espacio Economico Europeo, si consideras que el tratamiento de tus datos vulnera tus derechos, tienes derecho a presentar una reclamacion ante la autoridad de proteccion de datos de tu pais.",
          "Para usuarios en Colombia, puedes presentar quejas ante la Superintendencia de Industria y Comercio (SIC): www.sic.gov.co.",
        ],
      },
    ];
  }

  // English
  return [
    {
      title: "1. Introduction and Data Controller",
      content: [
        "This Privacy Policy describes how AutenticaMente (hereinafter, \"the Platform\"), operated by Dr. Liset Valencia Medina, clinical psychologist, collects, uses, stores, and protects the personal information of users who access our website, applications, and digital services.",
        "AutenticaMente is a psycho-spiritual transformation center that offers memberships, digital content, conferences, and clinical consultations. We are committed to protecting the privacy of our users in compliance with Colombian law (Law 1581 of 2012 and Decree 1377 of 2013), the European Union General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA), as applicable.",
        {
          subtitle: "Data Controller",
          text: "Name: Dr. Liset Valencia Medina / AutenticaMente\nEmail: contacto@autenticamente.com\nWhatsApp: +57 310 531 2817\nLocation: Colombia",
        },
      ],
    },
    {
      title: "2. Information We Collect",
      content: [
        "We collect different types of information depending on how you interact with the Platform:",
        {
          subtitle: "2.1 Personal data provided directly",
          text: "When you register, purchase a membership, buy digital content, schedule a consultation, or contact us, we may collect:",
        },
        {
          list: [
            "Full name",
            "Email address",
            "Phone number or WhatsApp",
            "Country and city of residence",
            "Profile information (photo, preferences)",
            "Emotional test responses",
            "Messages sent through contact forms or the AI chat assistant",
          ],
        },
        {
          subtitle: "2.2 Payment data",
          text: "Payments are processed through Stripe, a third-party payment service provider. AutenticaMente does NOT store credit card numbers or complete banking data. Stripe processes and stores this data in accordance with PCI DSS standards. For more information, see Stripe's privacy policy at https://stripe.com/privacy.",
        },
        {
          subtitle: "2.3 Usage and browsing data",
          text: "We automatically collect technical information when you browse the Platform:",
        },
        {
          list: [
            "IP address and approximate location",
            "Browser type and operating system",
            "Pages visited, time spent, and browsing patterns",
            "Referral source (how you arrived at our site)",
            "Device identifiers",
          ],
        },
        {
          subtitle: "2.4 Cookies and similar technologies",
          text: "We use cookies and tracking technologies to enhance user experience, analyze traffic, and personalize content. See section 9 of this policy for more details.",
        },
      ],
    },
    {
      title: "3. How We Use Your Information",
      content: [
        "We use the information collected for the following purposes:",
        {
          list: [
            "Service delivery: Manage your account, process payments, deliver digital content, manage memberships, and schedule consultations.",
            "Communication: Send you purchase confirmations, reminders, service updates, and, when authorized, promotional content and newsletters.",
            "Personalization: Tailor content recommendations, programs, and resources based on your emotional profile and preferences.",
            "AI assistant: Our chat uses the OpenAI API to provide you with personalized guidance. Messages you send to the assistant are processed through OpenAI to generate responses. We do not use this data to train AI models.",
            "Analysis and improvement: Understand how the Platform is used to improve our services, content, and user experience.",
            "Security: Detect and prevent fraud, unauthorized access, and other illegal activities.",
            "Legal obligations: Comply with applicable legal, regulatory, and tax requirements.",
          ],
        },
      ],
    },
    {
      title: "4. Legal Basis for Processing",
      content: [
        "The processing of your personal data is based on the following legal grounds:",
        {
          list: [
            "Consent: By registering on the Platform, accepting this privacy policy, and authorizing the processing of your data. You may revoke your consent at any time.",
            "Performance of contract: Processing is necessary for the provision of contracted services, including memberships, access to digital content, and consultations.",
            "Legitimate interest: To improve our services, ensure Platform security, and prevent fraud.",
            "Legal obligation: When processing is necessary to comply with applicable legal or regulatory obligations in Colombia or other jurisdictions.",
          ],
        },
      ],
    },
    {
      title: "5. Data Sharing and Third Parties",
      content: [
        "We do not sell, rent, or trade your personal information. However, we share data with the following trusted third parties, exclusively for the purposes described:",
        {
          list: [
            "Stripe: Secure payment processing. Stripe acts as an independent data processor. (https://stripe.com/privacy)",
            "OpenAI: Processing of AI assistant messages. OpenAI processes data in accordance with its enterprise data usage policy, which states that data is not used to train its models. (https://openai.com/policies/privacy-policy)",
            "Vercel: Platform hosting and infrastructure. (https://vercel.com/legal/privacy-policy)",
            "Email service provider: For sending transactional and authorized marketing emails.",
            "Google Analytics or other analytics tools: To understand usage patterns and improve the Platform.",
          ],
        },
        "In the event that AutenticaMente participates in a merger, acquisition, or asset sale, your personal data may be transferred as part of such transaction, with prior notice.",
      ],
    },
    {
      title: "6. International Data Transfers",
      content: [
        "Since AutenticaMente operates from Colombia and serves international users, your personal data may be transferred to and processed in countries other than your own, including the United States (where Stripe, OpenAI, and Vercel operate).",
        "These transfers are carried out with appropriate safeguards, including standard contractual clauses approved by competent authorities and compliance with applicable legal frameworks such as the GDPR for users in the European Economic Area.",
        "By using our Platform, you consent to these international data transfers in accordance with the safeguards described in this policy.",
      ],
    },
    {
      title: "7. Data Retention",
      content: [
        "We retain your personal data only for as long as necessary to fulfill the purposes for which it was collected:",
        {
          list: [
            "Account data: As long as you maintain an active account and for a reasonable period after cancellation for administrative and legal purposes.",
            "Transaction data: In accordance with applicable legal and tax requirements in Colombia (minimum 5 years for accounting and tax purposes).",
            "Usage and analytics data: Up to 26 months in aggregated and anonymized form.",
            "Communications and AI chat messages: Up to 90 days after the interaction, unless a longer period is required for legal reasons.",
            "Cookie data: According to the periods specified in our cookie settings (see section 9).",
          ],
        },
        "Once data is no longer needed, it will be securely deleted or anonymized.",
      ],
    },
    {
      title: "8. Your Rights",
      content: [
        "Under applicable law, you have the following rights regarding your personal data:",
        {
          subtitle: "8.1 Rights under Colombian Law (Law 1581 of 2012)",
          text: "",
        },
        {
          list: [
            "Right of access: Know, update, and rectify your personal data.",
            "Right of deletion: Request the deletion of your data when it is no longer necessary for the authorized purposes.",
            "Right of revocation: Revoke the authorization granted for the processing of your data.",
            "Right of consultation: Consult your personal data free of charge at least once per calendar month.",
            "Right to file complaints: File complaints with the Superintendence of Industry and Commerce (SIC) when you believe your rights have been violated.",
          ],
        },
        {
          subtitle: "8.2 Rights under the GDPR (for users in the EEA)",
          text: "",
        },
        {
          list: [
            "Right of access: Obtain a copy of your personal data.",
            "Right of rectification: Correct inaccurate or incomplete data.",
            "Right of erasure (right to be forgotten): Request the deletion of your data under certain circumstances.",
            "Right of restriction: Restrict the processing of your data in certain situations.",
            "Right of portability: Receive your data in a structured, commonly used, and machine-readable format.",
            "Right to object: Object to the processing of your data for reasons related to your particular situation.",
            "Right not to be subject to automated decisions: Including profiling with legal or similarly significant effects.",
          ],
        },
        {
          subtitle: "8.3 Rights under the CCPA (for California residents)",
          text: "",
        },
        {
          list: [
            "Right to know what personal data is collected, used, and shared.",
            "Right to request the deletion of your personal data.",
            "Right not to be discriminated against for exercising your privacy rights.",
            "AutenticaMente does not sell the personal information of its users.",
          ],
        },
        "To exercise any of these rights, contact us at contacto@autenticamente.com or WhatsApp: +57 310 531 2817. We will respond to your request within the applicable legal timeframes (15 business days under Colombian law, 30 days under the GDPR).",
      ],
    },
    {
      title: "9. Cookies and Tracking Technologies",
      content: [
        "We use cookies and similar technologies for the following purposes:",
        {
          list: [
            "Essential cookies: Necessary for the operation of the Platform, such as user authentication and session security.",
            "Performance cookies: Collect anonymous information about how users interact with the Platform, allowing us to improve its performance.",
            "Functionality cookies: Allow us to remember your preferences (such as selected language) to offer you a personalized experience.",
            "Marketing cookies: Used to display relevant content and measure the effectiveness of our campaigns. These cookies are only activated with your prior consent.",
          ],
        },
        "You can configure your browser to reject all cookies or to alert you when a cookie is being sent. Please note that if you disable cookies, some Platform features may not be available.",
      ],
    },
    {
      title: "10. Children's Privacy",
      content: [
        "AutenticaMente services are intended exclusively for persons aged 18 years and older. We do not knowingly collect personal information from minors.",
        "If you are a parent or legal guardian and believe that a minor under your care has provided us with personal data, please contact us immediately at contacto@autenticamente.com so we can proceed to delete such information.",
        "In the event that we become aware that we have collected data from a minor without proper authorization, we will delete such information immediately.",
      ],
    },
    {
      title: "11. Changes to This Policy",
      content: [
        "We reserve the right to modify this Privacy Policy at any time. Any material changes will be notified through:",
        {
          list: [
            "A prominent notice on the Platform.",
            "An email to the address associated with your account.",
            "An update to the \"Last modified\" date at the top of this page.",
          ],
        },
        "We recommend reviewing this policy periodically. Continued use of the Platform after the publication of changes constitutes acceptance of the modified policy.",
      ],
    },
    {
      title: "12. Contact",
      content: [
        "If you have questions, concerns, or requests related to this Privacy Policy or the processing of your personal data, you can contact us through the following channels:",
        {
          list: [
            "Email: contacto@autenticamente.com",
            "WhatsApp: +57 310 531 2817",
            "Instagram: @lisetvalenciam",
          ],
        },
        "For users in the European Economic Area, if you believe that the processing of your data violates your rights, you have the right to file a complaint with the data protection authority in your country.",
        "For users in Colombia, you may file complaints with the Superintendence of Industry and Commerce (SIC): www.sic.gov.co.",
      ],
    },
  ];
}

/* ── Component ─────────────────────────────────── */

export default function PrivacidadPage() {
  const { lang } = useLang();
  const isEs = lang === "es";

  const sections = getSections(lang);

  return (
    <div style={{ backgroundColor: "#F9F4F1" }}>
      {/* ── Dark hero ─────────────────────────────── */}
      <section
        className="px-6"
        style={{
          backgroundColor: "#000000",
          paddingTop: "clamp(100px, 14vw, 160px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
        }}
      >
        <div className="max-w-[800px] mx-auto space-y-5">
          <p
            className="font-body font-medium"
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.35em",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            {isEs ? "Legal" : "Legal"}
          </p>
          <h1
            className="font-display"
            style={{
              fontSize: "clamp(28px, 4.5vw, 48px)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#FFFFFF",
            }}
          >
            {isEs ? "Politica de Privacidad" : "Privacy Policy"}
          </h1>
          <p
            className="font-body"
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {isEs
              ? "Fecha de vigencia: Abril 2026"
              : "Effective date: April 2026"}
            {" | "}
            {isEs
              ? "Ultima actualizacion: Abril 2026"
              : "Last updated: April 2026"}
          </p>
        </div>
      </section>

      {/* ── Content body ──────────────────────────── */}
      <section
        className="px-6"
        style={{
          paddingTop: "clamp(48px, 6vw, 80px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
        }}
      >
        <div className="max-w-[800px] mx-auto space-y-12">
          {sections.map((section, i) => (
            <div key={i} className="space-y-4">
              <h2
                className="font-display"
                style={{
                  fontSize: "22px",
                  fontWeight: 400,
                  color: "#0A0A0A",
                }}
              >
                {section.title}
              </h2>
              {section.content.map((block, j) => {
                if (typeof block === "string") {
                  return (
                    <p
                      key={j}
                      className="font-body"
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.85,
                        color: "rgba(10,10,10,0.72)",
                      }}
                    >
                      {block}
                    </p>
                  );
                }
                if ("subtitle" in block) {
                  return (
                    <div key={j} className="space-y-2 pt-2">
                      <h3
                        className="font-body"
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                          color: "#0A0A0A",
                        }}
                      >
                        {block.subtitle}
                      </h3>
                      {block.text && (
                        <p
                          className="font-body whitespace-pre-line"
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.85,
                            color: "rgba(10,10,10,0.72)",
                          }}
                        >
                          {block.text}
                        </p>
                      )}
                    </div>
                  );
                }
                if ("list" in block) {
                  return (
                    <ul key={j} className="space-y-2 pl-1">
                      {block.list.map((item, k) => (
                        <li
                          key={k}
                          className="flex gap-3 font-body"
                          style={{
                            fontSize: "14px",
                            lineHeight: 1.85,
                            color: "rgba(10,10,10,0.72)",
                          }}
                        >
                          <span
                            className="mt-[10px] shrink-0 w-[5px] h-[5px] rounded-full"
                            style={{ backgroundColor: "#54132B" }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })}
            </div>
          ))}

          {/* ── Footer link ───────────────────────── */}
          <div
            className="pt-8 border-t"
            style={{ borderColor: "rgba(10,10,10,0.08)" }}
          >
            <p
              className="font-body"
              style={{ fontSize: "13px", color: "rgba(10,10,10,0.5)" }}
            >
              {isEs ? (
                <>
                  Consulta tambien nuestros{" "}
                  <Link
                    href="/terminos"
                    className="underline hover:no-underline"
                    style={{ color: "#54132B" }}
                  >
                    Terminos y Condiciones
                  </Link>
                  .
                </>
              ) : (
                <>
                  See also our{" "}
                  <Link
                    href="/terminos"
                    className="underline hover:no-underline"
                    style={{ color: "#54132B" }}
                  >
                    Terms and Conditions
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
