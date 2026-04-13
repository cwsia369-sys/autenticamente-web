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
        title: "1. Aceptacion de los Terminos",
        content: [
          "Al acceder, navegar o utilizar la plataforma AutenticaMente (en adelante, \"la Plataforma\"), operada por la Dra. Liset Valencia Medina, aceptas estos Terminos y Condiciones (en adelante, \"los Terminos\") en su totalidad. Si no estas de acuerdo con alguno de estos Terminos, no debes utilizar la Plataforma ni sus servicios.",
          "Estos Terminos constituyen un acuerdo legalmente vinculante entre tu (\"el Usuario\") y AutenticaMente. Al crear una cuenta, realizar una compra o utilizar cualquier servicio de la Plataforma, confirmas que has leido, comprendido y aceptado estos Terminos, asi como nuestra Politica de Privacidad.",
          "Nos reservamos el derecho de modificar estos Terminos en cualquier momento. Las modificaciones entraran en vigor desde su publicacion en la Plataforma. Tu uso continuado de los servicios tras dichas modificaciones constituye la aceptacion de los Terminos actualizados.",
        ],
      },
      {
        title: "2. Descripcion del Servicio",
        content: [
          "AutenticaMente es un centro de transformacion psicoespiritual que ofrece los siguientes servicios a traves de su plataforma digital:",
          {
            list: [
              "Membresias: Planes de suscripcion mensual con diferentes niveles de acceso a contenido exclusivo, herramientas de transformacion y acompanamiento.",
              "Contenido digital: Ebooks, workbooks, audios de meditacion, masterclasses y otros recursos descargables o de streaming.",
              "Conferencias y eventos: Conferencias presenciales y virtuales sobre temas de transformacion psicoespiritual, bienestar emocional y desarrollo personal.",
              "Consultas clinicas: Sesiones individuales de psicologia clinica con la Dra. Liset Valencia Medina (sujetas a disponibilidad y agendamiento previo).",
              "Test emocional: Herramienta de diagnostico emocional gratuita para identificar patrones de comportamiento y recibir recomendaciones personalizadas.",
              "Asistente de inteligencia artificial: Chat basado en IA para orientacion general sobre los servicios y programas de la Plataforma.",
              "Podcast y contenido multimedia: Material educativo y de reflexion disponible a traves de la Plataforma y redes sociales.",
            ],
          },
          "La disponibilidad de servicios especificos puede variar segun la ubicacion del usuario y las actualizaciones de la Plataforma.",
        ],
      },
      {
        title: "3. Registro de Cuenta y Seguridad",
        content: [
          "Para acceder a determinados servicios de la Plataforma, deberas crear una cuenta proporcionando informacion veraz, completa y actualizada.",
          {
            subtitle: "3.1 Requisitos de registro",
            text: "",
          },
          {
            list: [
              "Debes tener al menos 18 anos de edad para crear una cuenta y utilizar los servicios.",
              "La informacion proporcionada debe ser precisa y actualizada. Es tu responsabilidad mantener tus datos de cuenta al dia.",
              "Solo se permite una cuenta por persona. Las cuentas no son transferibles.",
            ],
          },
          {
            subtitle: "3.2 Seguridad de la cuenta",
            text: "",
          },
          {
            list: [
              "Eres responsable de mantener la confidencialidad de tus credenciales de acceso (correo electronico y contrasena).",
              "Debes notificarnos inmediatamente sobre cualquier uso no autorizado de tu cuenta o cualquier brecha de seguridad.",
              "AutenticaMente no sera responsable por perdidas o danos derivados del uso no autorizado de tu cuenta, salvo que dicho uso se deba a una falla de seguridad atribuible a la Plataforma.",
            ],
          },
          "Nos reservamos el derecho de suspender o cancelar cuentas que violen estos Terminos, que proporcionen informacion falsa o que se utilicen de manera fraudulenta.",
        ],
      },
      {
        title: "4. Planes de Membresia y Facturacion",
        content: [
          "AutenticaMente ofrece tres planes de membresia mensual:",
          {
            subtitle: "4.1 Plan Despertar - USD $19/mes",
            text: "Acceso a contenido basico de la Plataforma, incluyendo meditaciones guiadas, articulos y recursos introductorios de transformacion psicoespiritual.",
          },
          {
            subtitle: "4.2 Plan Circulo - USD $49/mes",
            text: "Incluye todo el contenido del Plan Despertar, mas acceso a masterclasses exclusivas, workbooks descargables, sesiones grupales mensuales y la comunidad privada.",
          },
          {
            subtitle: "4.3 Plan Verdad - USD $99/mes",
            text: "Incluye todo el contenido del Plan Circulo, mas acompanamiento personalizado, acceso prioritario a consultas con la Dra. Liset Valencia, sesiones de mentorias exclusivas y contenido premium.",
          },
          {
            subtitle: "4.4 Condiciones de facturacion",
            text: "",
          },
          {
            list: [
              "Todos los precios estan expresados en dolares estadounidenses (USD) e incluyen los impuestos aplicables segun la jurisdiccion del usuario.",
              "Los pagos se procesan de forma recurrente cada mes a traves de Stripe. Al suscribirte, autorizas el cobro automatico mensual.",
              "La fecha de facturacion corresponde al dia en que realizaste la primera suscripcion.",
              "En caso de que el pago no pueda procesarse, la Plataforma podra suspender el acceso a los servicios de la membresia hasta que se regularice el pago.",
              "Puedes cambiar de plan en cualquier momento. El cambio se hara efectivo en el siguiente ciclo de facturacion.",
            ],
          },
        ],
      },
      {
        title: "5. Contenido Digital y Propiedad Intelectual",
        content: [
          "Todo el contenido disponible en la Plataforma esta protegido por derechos de autor y propiedad intelectual.",
          {
            subtitle: "5.1 Titularidad",
            text: "Todo el contenido de la Plataforma, incluyendo pero no limitado a textos, audios, videos, imagenes, disenos, logotipos, materiales descargables, metodologias y programas, es propiedad exclusiva de AutenticaMente y/o la Dra. Liset Valencia Medina, y esta protegido por las leyes colombianas e internacionales de propiedad intelectual y derechos de autor.",
          },
          {
            subtitle: "5.2 Licencia de uso",
            text: "Al adquirir una membresia o contenido digital, se te otorga una licencia personal, limitada, no exclusiva, no transferible y revocable para acceder y utilizar el contenido exclusivamente para tu uso personal y no comercial.",
          },
          {
            subtitle: "5.3 Restricciones",
            text: "Queda expresamente prohibido:",
          },
          {
            list: [
              "Reproducir, copiar, distribuir, transmitir o publicar cualquier contenido de la Plataforma sin autorizacion escrita previa.",
              "Modificar, adaptar, traducir o crear obras derivadas del contenido.",
              "Utilizar el contenido con fines comerciales, educativos (salvo uso personal), o de reventa.",
              "Compartir credenciales de acceso o permitir que terceros accedan a tu cuenta.",
              "Descargar, capturar en pantalla o grabar contenido de streaming para su redistribucion.",
              "Eliminar o alterar avisos de derechos de autor, marcas registradas u otros avisos de propiedad.",
            ],
          },
          "La marca AutenticaMente y su logotipo son marcas registradas. Su uso no autorizado constituye una infraccion de los derechos de propiedad intelectual.",
        ],
      },
      {
        title: "6. Uso Prohibido",
        content: [
          "Al utilizar la Plataforma, te comprometes a no:",
          {
            list: [
              "Utilizar la Plataforma para fines ilegales o no autorizados.",
              "Redistribuir, revender o compartir comercialmente el contenido o los servicios.",
              "Interferir con el funcionamiento normal de la Plataforma o sus sistemas de seguridad.",
              "Intentar acceder a cuentas de otros usuarios, sistemas o redes de la Plataforma sin autorizacion.",
              "Publicar o transmitir contenido difamatorio, ofensivo, amenazante, discriminatorio u obsceno en los espacios comunitarios de la Plataforma.",
              "Utilizar bots, scripts automatizados o herramientas de scraping para extraer contenido de la Plataforma.",
              "Suplantar la identidad de otra persona o entidad.",
              "Utilizar el asistente de IA para fines distintos a los previstos, incluyendo intentos de manipulacion o generacion de contenido danino.",
              "Promover servicios de terceros o realizar actividades de spam en los espacios de la Plataforma.",
            ],
          },
          "El incumplimiento de estas prohibiciones podra resultar en la suspension o cancelacion inmediata de tu cuenta, sin derecho a reembolso, y sin perjuicio de las acciones legales que AutenticaMente considere pertinentes.",
        ],
      },
      {
        title: "7. Aviso Clinico Importante",
        content: [
          "Es fundamental que comprendas las siguientes consideraciones sobre la naturaleza de los servicios de AutenticaMente:",
          {
            list: [
              "Las membresias y el contenido digital de AutenticaMente tienen un proposito educativo, informativo y de acompanamiento en procesos de transformacion personal. No constituyen ni sustituyen un tratamiento psicologico, psiquiatrico o medico profesional.",
              "El contenido de la Plataforma, incluidas las meditaciones, workbooks, masterclasses y el asistente de IA, no deben interpretarse como diagnostico, prescripcion o tratamiento de ninguna condicion de salud mental o fisica.",
              "Si te encuentras en una situacion de crisis emocional, tienes pensamientos suicidas o requieres atencion de emergencia, contacta inmediatamente a los servicios de emergencia de tu pais o a una linea de crisis.",
              "Las consultas clinicas individuales con la Dra. Liset Valencia Medina si constituyen servicios profesionales de psicologia clinica y se rigen por la normatividad profesional aplicable en Colombia. Estas consultas son independientes del contenido de la membresia.",
              "La relacion entre el usuario y AutenticaMente en el marco de las membresias no constituye una relacion terapeuta-paciente.",
              "Los resultados del test emocional son orientativos y no constituyen un diagnostico clinico.",
            ],
          },
        ],
      },
      {
        title: "8. Cancelacion y Politica de Reembolso",
        content: [
          {
            subtitle: "8.1 Cancelacion de membresia",
            text: "",
          },
          {
            list: [
              "Puedes cancelar tu membresia en cualquier momento desde la configuracion de tu cuenta o contactandonos directamente.",
              "La cancelacion sera efectiva al final del periodo de facturacion vigente. Mantendras acceso a los servicios de tu membresia hasta la fecha de vencimiento del periodo pagado.",
              "No se generaran cargos adicionales despues de la cancelacion.",
            ],
          },
          {
            subtitle: "8.2 Reembolsos",
            text: "",
          },
          {
            list: [
              "No se otorgan reembolsos prorrateados por periodos parciales de uso.",
              "No se otorgan reembolsos por contenido digital ya descargado o accedido.",
              "En caso de cobros duplicados o errores de facturacion, contactanos dentro de los 30 dias siguientes al cargo para solicitar la correccion correspondiente.",
              "AutenticaMente se reserva el derecho de otorgar reembolsos excepcionales a su sola discrecion, evaluando cada caso de forma individual.",
            ],
          },
          {
            subtitle: "8.3 Suspension por parte de AutenticaMente",
            text: "Nos reservamos el derecho de suspender o cancelar tu cuenta y acceso a los servicios en caso de incumplimiento de estos Terminos, sin obligacion de reembolso. En casos de suspension por incumplimiento grave, la cancelacion sera inmediata y sin previo aviso.",
          },
        ],
      },
      {
        title: "9. Limitacion de Responsabilidad",
        content: [
          "En la maxima medida permitida por la ley aplicable:",
          {
            list: [
              "La Plataforma y sus servicios se proporcionan \"tal cual\" y \"segun disponibilidad\", sin garantias de ningun tipo, ya sean expresas o implicitas.",
              "AutenticaMente no garantiza que la Plataforma estara disponible de forma ininterrumpida, libre de errores o completamente segura.",
              "AutenticaMente no sera responsable por danos indirectos, incidentales, especiales, consecuentes o punitivos, incluyendo perdida de datos, perdida de beneficios o interrupcion del servicio.",
              "La responsabilidad total de AutenticaMente frente a cualquier reclamacion relacionada con estos Terminos no excedera el monto total pagado por el usuario durante los 12 meses anteriores a la reclamacion.",
              "AutenticaMente no se responsabiliza por el contenido generado por el asistente de inteligencia artificial, el cual tiene un caracter informativo y orientativo, no clinico ni terapeutico.",
              "AutenticaMente no se responsabiliza por las decisiones que el usuario tome basandose en el contenido de la Plataforma.",
            ],
          },
          "Algunas jurisdicciones no permiten la exclusion o limitacion de ciertas garantias o responsabilidades. En tales casos, las limitaciones anteriores se aplicaran en la maxima medida permitida por la ley.",
        ],
      },
      {
        title: "10. Ley Aplicable y Jurisdiccion",
        content: [
          "Estos Terminos se regiran e interpretaran de conformidad con las leyes de la Republica de Colombia.",
          "Para cualquier controversia, reclamacion o disputa derivada de o relacionada con estos Terminos o el uso de la Plataforma, las partes acuerdan someterse a la jurisdiccion exclusiva de los tribunales competentes de la ciudad de Bogota D.C., Colombia.",
          "Lo anterior no afectara los derechos que te correspondan como consumidor en virtud de las leyes de proteccion al consumidor de tu pais de residencia, cuando dichas leyes sean aplicables de manera imperativa.",
        ],
      },
      {
        title: "11. Resolucion de Controversias",
        content: [
          "Antes de iniciar cualquier procedimiento legal, las partes se comprometen a intentar resolver de buena fe cualquier controversia a traves de los siguientes mecanismos:",
          {
            list: [
              "Negociacion directa: El usuario debera comunicar su reclamacion por escrito a contacto@autenticamente.com. AutenticaMente tendra un plazo de 30 dias habiles para responder y proponer una solucion.",
              "Mediacion: Si no se alcanza un acuerdo mediante negociacion directa, las partes podran someterse a un proceso de mediacion ante un mediador autorizado en Colombia.",
              "Arbitraje o via judicial: En caso de que la mediacion no prospere, cualquiera de las partes podra acudir a los tribunales competentes de Bogota D.C., Colombia, conforme a lo establecido en la seccion 10.",
            ],
          },
          "Para usuarios en la Union Europea, podras utilizar la plataforma de resolucion de litigios en linea de la Comision Europea disponible en https://ec.europa.eu/consumers/odr.",
        ],
      },
      {
        title: "12. Modificaciones a los Terminos",
        content: [
          "AutenticaMente se reserva el derecho de modificar, actualizar o reemplazar estos Terminos en cualquier momento. Las modificaciones se comunicaran a traves de:",
          {
            list: [
              "Publicacion de los Terminos actualizados en la Plataforma con la nueva fecha de vigencia.",
              "Notificacion por correo electronico a los usuarios registrados para cambios sustanciales.",
              "Aviso destacado en la Plataforma durante un periodo razonable.",
            ],
          },
          "Los cambios no sustanciales entraran en vigor inmediatamente tras su publicacion. Los cambios sustanciales entraran en vigor 30 dias despues de la notificacion, salvo que se requiera un plazo diferente por ley.",
          "Si no estas de acuerdo con los Terminos modificados, debes dejar de utilizar la Plataforma y cancelar tu cuenta antes de la fecha de entrada en vigor de los cambios.",
        ],
      },
      {
        title: "13. Divisibilidad",
        content: [
          "Si alguna disposicion de estos Terminos se considera invalida, ilegal o inaplicable por un tribunal competente, dicha disposicion se modificara en la minima medida necesaria para hacerla valida y aplicable, o se eliminara si no es posible su modificacion.",
          "La invalidez o inaplicabilidad de una disposicion no afectara la validez y aplicabilidad de las demas disposiciones de estos Terminos, las cuales continuaran en pleno vigor y efecto.",
        ],
      },
      {
        title: "14. Contacto",
        content: [
          "Para cualquier pregunta, comentario o reclamacion relacionada con estos Terminos y Condiciones, puedes contactarnos a traves de:",
          {
            list: [
              "Correo electronico: contacto@autenticamente.com",
              "WhatsApp: +57 310 531 2817",
              "Instagram: @lisetvalenciam",
              "TikTok: @dralisetvalencia",
              "YouTube: @lisetvalenciam",
            ],
          },
          "Nuestro equipo respondera a tu consulta en un plazo maximo de 15 dias habiles.",
        ],
      },
    ];
  }

  // English
  return [
    {
      title: "1. Acceptance of Terms",
      content: [
        "By accessing, browsing, or using the AutenticaMente platform (hereinafter, \"the Platform\"), operated by Dr. Liset Valencia Medina, you accept these Terms and Conditions (hereinafter, \"the Terms\") in their entirety. If you do not agree with any of these Terms, you must not use the Platform or its services.",
        "These Terms constitute a legally binding agreement between you (\"the User\") and AutenticaMente. By creating an account, making a purchase, or using any service on the Platform, you confirm that you have read, understood, and accepted these Terms, as well as our Privacy Policy.",
        "We reserve the right to modify these Terms at any time. Modifications will take effect upon publication on the Platform. Your continued use of the services after such modifications constitutes acceptance of the updated Terms.",
      ],
    },
    {
      title: "2. Description of Service",
      content: [
        "AutenticaMente is a psycho-spiritual transformation center that offers the following services through its digital platform:",
        {
          list: [
            "Memberships: Monthly subscription plans with different levels of access to exclusive content, transformation tools, and guidance.",
            "Digital content: Ebooks, workbooks, guided meditation audios, masterclasses, and other downloadable or streaming resources.",
            "Conferences and events: In-person and virtual conferences on psycho-spiritual transformation, emotional wellbeing, and personal development.",
            "Clinical consultations: Individual clinical psychology sessions with Dr. Liset Valencia Medina (subject to availability and prior scheduling).",
            "Emotional test: Free emotional assessment tool to identify behavioral patterns and receive personalized recommendations.",
            "AI assistant: AI-based chat for general guidance on Platform services and programs.",
            "Podcast and multimedia content: Educational and reflective material available through the Platform and social media.",
          ],
        },
        "The availability of specific services may vary depending on the user's location and Platform updates.",
      ],
    },
    {
      title: "3. Account Registration and Security",
      content: [
        "To access certain services on the Platform, you must create an account by providing truthful, complete, and up-to-date information.",
        {
          subtitle: "3.1 Registration requirements",
          text: "",
        },
        {
          list: [
            "You must be at least 18 years of age to create an account and use the services.",
            "The information provided must be accurate and up to date. It is your responsibility to keep your account information current.",
            "Only one account per person is permitted. Accounts are non-transferable.",
          ],
        },
        {
          subtitle: "3.2 Account security",
          text: "",
        },
        {
          list: [
            "You are responsible for maintaining the confidentiality of your login credentials (email and password).",
            "You must notify us immediately of any unauthorized use of your account or any security breach.",
            "AutenticaMente will not be liable for losses or damages resulting from unauthorized use of your account, unless such use is due to a security failure attributable to the Platform.",
          ],
        },
        "We reserve the right to suspend or cancel accounts that violate these Terms, provide false information, or are used fraudulently.",
      ],
    },
    {
      title: "4. Membership Plans and Billing",
      content: [
        "AutenticaMente offers three monthly membership plans:",
        {
          subtitle: "4.1 Despertar Plan - USD $19/month",
          text: "Access to basic Platform content, including guided meditations, articles, and introductory psycho-spiritual transformation resources.",
        },
        {
          subtitle: "4.2 Circulo Plan - USD $49/month",
          text: "Includes all Despertar Plan content, plus access to exclusive masterclasses, downloadable workbooks, monthly group sessions, and the private community.",
        },
        {
          subtitle: "4.3 Verdad Plan - USD $99/month",
          text: "Includes all Circulo Plan content, plus personalized guidance, priority access to consultations with Dr. Liset Valencia, exclusive mentoring sessions, and premium content.",
        },
        {
          subtitle: "4.4 Billing conditions",
          text: "",
        },
        {
          list: [
            "All prices are expressed in US dollars (USD) and include applicable taxes based on the user's jurisdiction.",
            "Payments are processed on a recurring monthly basis through Stripe. By subscribing, you authorize automatic monthly billing.",
            "The billing date corresponds to the day you made your first subscription.",
            "If payment cannot be processed, the Platform may suspend access to membership services until payment is regularized.",
            "You may change your plan at any time. The change will take effect in the next billing cycle.",
          ],
        },
      ],
    },
    {
      title: "5. Digital Content and Intellectual Property",
      content: [
        "All content available on the Platform is protected by copyright and intellectual property rights.",
        {
          subtitle: "5.1 Ownership",
          text: "All Platform content, including but not limited to texts, audios, videos, images, designs, logos, downloadable materials, methodologies, and programs, is the exclusive property of AutenticaMente and/or Dr. Liset Valencia Medina, and is protected by Colombian and international intellectual property and copyright laws.",
        },
        {
          subtitle: "5.2 License of use",
          text: "By purchasing a membership or digital content, you are granted a personal, limited, non-exclusive, non-transferable, and revocable license to access and use the content exclusively for your personal, non-commercial use.",
        },
        {
          subtitle: "5.3 Restrictions",
          text: "The following is expressly prohibited:",
        },
        {
          list: [
            "Reproducing, copying, distributing, transmitting, or publishing any Platform content without prior written authorization.",
            "Modifying, adapting, translating, or creating derivative works from the content.",
            "Using content for commercial, educational (except personal use), or resale purposes.",
            "Sharing login credentials or allowing third parties to access your account.",
            "Downloading, screen-capturing, or recording streaming content for redistribution.",
            "Removing or altering copyright notices, trademarks, or other proprietary notices.",
          ],
        },
        "The AutenticaMente brand and its logo are registered trademarks. Unauthorized use constitutes an infringement of intellectual property rights.",
      ],
    },
    {
      title: "6. Prohibited Use",
      content: [
        "By using the Platform, you agree not to:",
        {
          list: [
            "Use the Platform for illegal or unauthorized purposes.",
            "Redistribute, resell, or commercially share the content or services.",
            "Interfere with the normal operation of the Platform or its security systems.",
            "Attempt to access other users' accounts, Platform systems, or networks without authorization.",
            "Post or transmit defamatory, offensive, threatening, discriminatory, or obscene content in the Platform's community spaces.",
            "Use bots, automated scripts, or scraping tools to extract content from the Platform.",
            "Impersonate another person or entity.",
            "Use the AI assistant for purposes other than those intended, including attempts at manipulation or generation of harmful content.",
            "Promote third-party services or engage in spam activities on the Platform.",
          ],
        },
        "Violation of these prohibitions may result in the immediate suspension or cancellation of your account, without the right to a refund, and without prejudice to any legal actions AutenticaMente may deem appropriate.",
      ],
    },
    {
      title: "7. Important Clinical Disclaimer",
      content: [
        "It is essential that you understand the following considerations about the nature of AutenticaMente's services:",
        {
          list: [
            "AutenticaMente's memberships and digital content serve an educational, informational, and personal transformation guidance purpose. They do not constitute or replace professional psychological, psychiatric, or medical treatment.",
            "The Platform's content, including meditations, workbooks, masterclasses, and the AI assistant, should not be interpreted as diagnosis, prescription, or treatment of any mental or physical health condition.",
            "If you are in an emotional crisis, have suicidal thoughts, or require emergency care, immediately contact your country's emergency services or a crisis helpline.",
            "Individual clinical consultations with Dr. Liset Valencia Medina do constitute professional clinical psychology services and are governed by applicable professional regulations in Colombia. These consultations are independent of the membership content.",
            "The relationship between the user and AutenticaMente within the scope of memberships does not constitute a therapist-patient relationship.",
            "Emotional test results are indicative and do not constitute a clinical diagnosis.",
          ],
        },
      ],
    },
    {
      title: "8. Cancellation and Refund Policy",
      content: [
        {
          subtitle: "8.1 Membership cancellation",
          text: "",
        },
        {
          list: [
            "You may cancel your membership at any time from your account settings or by contacting us directly.",
            "Cancellation will be effective at the end of the current billing period. You will retain access to your membership services until the expiration date of the paid period.",
            "No additional charges will be generated after cancellation.",
          ],
        },
        {
          subtitle: "8.2 Refunds",
          text: "",
        },
        {
          list: [
            "No prorated refunds are granted for partial periods of use.",
            "No refunds are granted for digital content that has already been downloaded or accessed.",
            "In the case of duplicate charges or billing errors, contact us within 30 days of the charge to request the corresponding correction.",
            "AutenticaMente reserves the right to grant exceptional refunds at its sole discretion, evaluating each case individually.",
          ],
        },
        {
          subtitle: "8.3 Suspension by AutenticaMente",
          text: "We reserve the right to suspend or cancel your account and access to services in the event of a breach of these Terms, without obligation to refund. In cases of suspension due to serious breach, cancellation will be immediate and without prior notice.",
        },
      ],
    },
    {
      title: "9. Limitation of Liability",
      content: [
        "To the maximum extent permitted by applicable law:",
        {
          list: [
            "The Platform and its services are provided \"as is\" and \"as available,\" without warranties of any kind, whether express or implied.",
            "AutenticaMente does not guarantee that the Platform will be available uninterrupted, error-free, or completely secure.",
            "AutenticaMente will not be liable for indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of profits, or service interruption.",
            "AutenticaMente's total liability for any claim related to these Terms shall not exceed the total amount paid by the user during the 12 months preceding the claim.",
            "AutenticaMente is not responsible for content generated by the AI assistant, which is informational and guidance-oriented in nature, not clinical or therapeutic.",
            "AutenticaMente is not responsible for decisions made by the user based on Platform content.",
          ],
        },
        "Some jurisdictions do not allow the exclusion or limitation of certain warranties or liabilities. In such cases, the above limitations will apply to the maximum extent permitted by law.",
      ],
    },
    {
      title: "10. Governing Law and Jurisdiction",
      content: [
        "These Terms shall be governed by and construed in accordance with the laws of the Republic of Colombia.",
        "For any controversy, claim, or dispute arising from or related to these Terms or the use of the Platform, the parties agree to submit to the exclusive jurisdiction of the competent courts of the city of Bogota D.C., Colombia.",
        "The foregoing shall not affect the rights to which you are entitled as a consumer under the consumer protection laws of your country of residence, where such laws apply mandatorily.",
      ],
    },
    {
      title: "11. Dispute Resolution",
      content: [
        "Before initiating any legal proceedings, the parties commit to attempting to resolve any dispute in good faith through the following mechanisms:",
        {
          list: [
            "Direct negotiation: The user must communicate their claim in writing to contacto@autenticamente.com. AutenticaMente will have a period of 30 business days to respond and propose a solution.",
            "Mediation: If an agreement is not reached through direct negotiation, the parties may submit to a mediation process before an authorized mediator in Colombia.",
            "Arbitration or judicial proceedings: If mediation does not succeed, either party may resort to the competent courts of Bogota D.C., Colombia, as established in section 10.",
          ],
        },
        "For users in the European Union, you may use the European Commission's online dispute resolution platform available at https://ec.europa.eu/consumers/odr.",
      ],
    },
    {
      title: "12. Modifications to Terms",
      content: [
        "AutenticaMente reserves the right to modify, update, or replace these Terms at any time. Modifications will be communicated through:",
        {
          list: [
            "Publication of the updated Terms on the Platform with the new effective date.",
            "Email notification to registered users for material changes.",
            "A prominent notice on the Platform for a reasonable period.",
          ],
        },
        "Non-material changes will take effect immediately upon publication. Material changes will take effect 30 days after notification, unless a different period is required by law.",
        "If you do not agree with the modified Terms, you must stop using the Platform and cancel your account before the effective date of the changes.",
      ],
    },
    {
      title: "13. Severability",
      content: [
        "If any provision of these Terms is deemed invalid, illegal, or unenforceable by a competent court, such provision shall be modified to the minimum extent necessary to make it valid and enforceable, or shall be removed if modification is not possible.",
        "The invalidity or unenforceability of any provision shall not affect the validity and enforceability of the remaining provisions of these Terms, which shall continue in full force and effect.",
      ],
    },
    {
      title: "14. Contact",
      content: [
        "For any questions, comments, or claims related to these Terms and Conditions, you can contact us through:",
        {
          list: [
            "Email: contacto@autenticamente.com",
            "WhatsApp: +57 310 531 2817",
            "Instagram: @lisetvalenciam",
            "TikTok: @dralisetvalencia",
            "YouTube: @lisetvalenciam",
          ],
        },
        "Our team will respond to your inquiry within a maximum of 15 business days.",
      ],
    },
  ];
}

/* ── Component ─────────────────────────────────── */

export default function TerminosPage() {
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
            {isEs ? "Terminos y Condiciones" : "Terms and Conditions"}
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
                  Consulta tambien nuestra{" "}
                  <Link
                    href="/privacidad"
                    className="underline hover:no-underline"
                    style={{ color: "#54132B" }}
                  >
                    Politica de Privacidad
                  </Link>
                  .
                </>
              ) : (
                <>
                  See also our{" "}
                  <Link
                    href="/privacidad"
                    className="underline hover:no-underline"
                    style={{ color: "#54132B" }}
                  >
                    Privacy Policy
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
