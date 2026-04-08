export interface ClientConfig {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  heroTitle: string;
  heroImage: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  logoIcon: string;
  favicon: string;
  fbLink?: string;
  igLink?: string;
  address: string;
  mapsLink: string;
  schedule: string;
  services: {
    title: string;
    description: string;
    icon: string;
  }[];
  specialties: {
    name: string;
    desc: string;
    icon: string;
  }[];
  bookingServices: string[];
  branches: {
    name: string;
    address: string;
    mapsLink: string;
    schedule: string;
  }[];
  testimonials: {
    quote: string;
    author: string;
  }[];
}

export const CLIENTS: Record<string, ClientConfig> = {
  'smylife': {
    id: 'smylife',
    name: 'Smylife Dental',
    shortName: 'Smylife',
    tagline: 'Tu sonrisa, nuestra prioridad',
    heroTitle: 'Agenda tu próxima <span class="text-[#00AEEF]">sonrisa</span> en menos de 60 segundos.',
    heroImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop',
    description: 'Smylife Dental: Agenda tu próxima sonrisa en menos de 60 segundos. Sistema automatizado de citas en Reynosa.',
    primaryColor: '#00AEEF',
    secondaryColor: '#009ED9',
    logoIcon: 'lucide:smile',
    favicon: '/favicon-dental.svg',
    fbLink: 'https://www.facebook.com/SmylifeDental01/',
    address: 'Parque Alcala #632, FRACC. Balcones de Alcala, Reynosa, Mexico',
    mapsLink: 'https://maps.app.goo.gl/VrSoEZ23bAQPcQUz7',
    schedule: 'Atención de Lunes a Sábado',
    services: [
      { title: 'Limpieza Dental', description: 'Profilaxis profesional para mantener tus dientes y encías saludables.', icon: 'lucide:sparkles' },
      { title: 'Valoración Inicial', description: 'Diagnóstico completo con tecnología digital para tu plan de tratamiento.', icon: 'lucide:clipboard-list' },
      { title: 'Ortodoncia', description: 'Diseño de sonrisa con Brackets de última generación para todas las edades.', icon: 'lucide:layers' },
      { title: 'Blanqueamiento', description: 'Recupera el brillo natural de tu sonrisa con resultados inmediatos.', icon: 'lucide:zap' }
    ],
    specialties: [
      { name: 'Endodoncia', desc: 'Tratamientos de conductos avanzados para salvar tus piezas dentales.', icon: 'lucide:activity' },
      { name: 'Periodoncia', desc: 'Cuidado especializado de las encías y tejidos de soporte.', icon: 'lucide:shield-plus' },
      { name: 'Odontopediatría', desc: 'Atención dental experta y divertida para los más pequeños.', icon: 'lucide:baby' },
      { name: 'Rehabilitación', desc: 'Prótesis e implantes para recuperar la funcionalidad y estética.', icon: 'lucide:wrench' }
    ],
    bookingServices: ['Limpieza Dental (Profilaxis)', 'Consulta de Valoración', 'Ortodoncia (Brackets)', 'Blanqueamiento Dental'],
    branches: [
      { 
        name: 'Sucursal Principal - Balcones', 
        address: 'Parque Alcala #632, FRACC. Balcones de Alcala, Reynosa, Mexico', 
        mapsLink: 'https://maps.app.goo.gl/VrSoEZ23bAQPcQUz7', 
        schedule: 'Lunes a Sábado' 
      }
    ],
    testimonials: [
      { quote: "Mi tratamiento de ortodoncia con los Brackets de zafiro va increíble, casi no se notan y la atención es de primera.", author: "Valeria Villagrán" },
      { quote: "Fui por una limpieza dental y salí con mi sonrisa renovada. El equipo es super profesional y las instalaciones muy modernas.", author: "Mauricio Santillán" },
      { quote: "La mejor experiencia en blanqueamiento dental que he tenido. Sin sensibilidad y resultados reales desde la primera sesión.", author: "Ximena de la Fuente" }
    ]
  },
  'dental-advance': {
    id: 'dental-advance',
    name: 'Dental Advance',
    shortName: 'Dental Advance',
    tagline: 'Excelencia y precisión en cada sonrisa',
    heroTitle: 'Tu salud dental merece un <span class="text-[var(--primary)]">estándar de 5 estrellas</span>.',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop',
    description: 'Clínica dental de alta especialidad en Las Fuentes. Tecnología avanzada y atención de élite para resultados perfectos.',
    primaryColor: '#0D9488',
    secondaryColor: '#0F766E',
    logoIcon: 'lucide:award',
    favicon: '/favicon-advance.svg',
    address: 'Blvd. Del Maestro 301, Segundo Piso, Col. Las Fuentes, Reynosa, Tamps.',
    mapsLink: 'https://maps.app.goo.gl/VrSoEZ23bAQPcQUz7',
    schedule: 'Lunes a Viernes de 9:00 AM a 7:00 PM',
    services: [
      { title: 'Implantes Dentales', description: 'Restauración permanente con tecnología de mínima invasión.', icon: 'lucide:plus-circle' },
      { title: 'Ortodoncia Invisible', description: 'Alinea tu sonrisa con brackets estéticos y sistemas modernos.', icon: 'lucide:smile' },
      { title: 'Diseño de Sonrisa', description: 'Transformación total estética para una apariencia natural y brillante.', icon: 'lucide:sparkles' }
    ],
    specialties: [
      { name: 'Cirugía Maxilofacial', desc: 'Procedimientos complejos realizados por especialistas certificados.', icon: 'lucide:activity' },
      { name: 'Rehabilitación Oral', desc: 'Devolvemos la función y estética a tu boca de forma integral.', icon: 'lucide:smile' }
    ],
    bookingServices: ['Implantes Dentales', 'Ortodoncia Invisible', 'Diseño de Sonrisa'],
    branches: [
      { 
        name: 'Sucursal Las Fuentes', 
        address: 'Blvd. Del Maestro 301, Segundo Piso, Col. Las Fuentes, Reynosa, Tamps.', 
        mapsLink: 'https://maps.app.goo.gl/VrSoEZ23bAQPcQUz7', 
        schedule: 'Lunes a Viernes: 9AM - 7PM' 
      }
    ],
    testimonials: [
      { quote: "Excelente atención y tecnología. Mis implantes quedaron perfectos y el proceso fue mucho más rápido de lo que esperaba.", author: "Roberto Méndez" },
      { quote: "El mejor diseño de sonrisa en Reynosa. Muy profesionales y cuidan cada detalle para que luzca natural.", author: "Elena Rodríguez" }
    ]
  },
  'bidental': {
    id: 'bidental',
    name: 'BiDental Reynosa',
    shortName: 'BiDental',
    tagline: 'Creando una sonrisa para ti',
    heroTitle: 'La clínica dental favorita de <span class="text-[var(--primary)]">Cumbres</span> ahora más cerca de ti.',
    heroImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=1200&auto=format&fit=crop',
    description: 'BiDental Reynosa: Odontología integral en Las Cumbres. Especialistas en endodoncia, ortodoncia y prótesis dental.',
    primaryColor: '#19a9ad',
    secondaryColor: '#148e91',
    logoIcon: 'lucide:heart-handshake',
    favicon: '/favicon-bidental.svg',
    address: 'Blvd. Mil Cumbres #1015, Col. Las Cumbres, Reynosa, Tamps.',
    mapsLink: 'https://share.google/9pLJ4VNaAqPZWxOuN',
    schedule: 'Lunes a Viernes de 9:00 AM a 7:00 PM',
    services: [
      { title: 'Limpieza con Ultrasonido', description: 'Tecnología avanzada para una limpieza profunda y sin dolor.', icon: 'lucide:zap' },
      { title: 'Resinas Estéticas', description: 'Restauraciones naturales que devuelven la belleza a tus dientes.', icon: 'lucide:sparkles' },
      { title: 'Extracciones', description: 'Procedimientos seguros con el cuidado y profesionalismo que mereces.', icon: 'lucide:shield' }
    ],
    specialties: [
      { name: 'Endodoncia', desc: 'Tratamientos especializados para salvar tus piezas dentales.', icon: 'lucide:activity' },
      { name: 'Ortodoncia', desc: 'Corrección de posición dental con sistemas modernos.', icon: 'lucide:layers' },
      { name: 'Prótesis Fija y Removible', desc: 'Restauración integral de la función y estética dental.', icon: 'lucide:smile' },
      { name: 'Atención Infantil', desc: 'Cuidado dental experto y paciente para los más pequeños.', icon: 'lucide:baby' }
    ],
    bookingServices: ['Limpieza con Ultrasonido', 'Resinas Estéticas', 'Extracciones', 'Endodoncia', 'Ortodoncia'],
    branches: [
      { 
        name: 'Sucursal Cumbres', 
        address: 'Blvd. Mil Cumbres #1015, Col. Las Cumbres, Reynosa, Tamps.', 
        mapsLink: 'https://share.google/9pLJ4VNaAqPZWxOuN', 
        schedule: 'Lunes a Viernes: 9AM - 7PM' 
      }
    ],
    testimonials: [
      { quote: "La atención con los niños es maravillosa, mis hijos ya no tienen miedo de ir al dentista gracias a BiDental.", author: "Carolina Garza" },
      { quote: "Muy recomendados para endodoncias, no sentí nada de dolor y el trato fue excelente de principio a fin.", author: "Héctor Treviño" }
    ]
  },
  'medicos-express': {
    id: 'medicos-express',
    name: 'Médicos Express',
    shortName: 'Medic\'s',
    tagline: 'Atención inmediata sin previa cita en Urgencias',
    heroTitle: 'Atención Médica <span class="text-blue-600 dark:text-blue-400">Integral 24/7</span> en Reynosa.',
    heroImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop',
    description: 'Atención médica de alta calidad en Reynosa sin esperas. Agenda tu cita hoy mismo.',
    primaryColor: '#2563eb',
    secondaryColor: '#1d4ed8',
    logoIcon: 'lucide:stethoscope',
    favicon: '/favicon.svg',
    address: 'Reynosa, Tamaulipas, México',
    mapsLink: '#',
    schedule: 'Atención 24/7',
    services: [
      { title: 'Consulta Médica General', description: 'Atención primaria para toda la familia con diagnósticos precisos.', icon: 'lucide:stethoscope' },
      { title: 'Urgencias 24 Horas', description: 'Listos para atenderte en cualquier momento, los 365 días del año.', icon: 'lucide:ambulance' },
      { title: 'Laboratorio Clínico', description: 'Resultados precisos y rápidos con tecnología de vanguardia.', icon: 'lucide:microscope' },
      { title: 'Gabinete de Imagen', description: 'Rayos X y Tomografía de alta resolución para diagnósticos claros.', icon: 'lucide:monitor-dot' }
    ],
    specialties: [
      { name: 'Ginecología', desc: 'Salud integral para la mujer con la calidez y privacidad que mereces.', icon: 'lucide:flower-2' },
      { name: 'Pediatría', desc: 'Cuidado experto y preventivo para el sano crecimiento de tus hijos.', icon: 'lucide:baby' },
      { name: 'Traumatología', desc: 'Especialistas en la recuperación de movilidad y lesiones musculares.', icon: 'lucide:bone' },
      { name: 'Cirugía General', desc: 'Procedimientos quirúrgicos seguros realizados por manos expertas.', icon: 'lucide:scissors' }
    ],
    bookingServices: ['Médico General', 'Ginecología', 'Pediatría', 'Traumatología', 'Laboratorios', 'Rayos X'],
    branches: [
      { name: 'La Joya', address: 'Sucursal La Joya, Reynosa', mapsLink: '#', schedule: '24/7' },
      { name: 'José López Portillo', address: 'Sucursal López Portillo, Reynosa', mapsLink: '#', schedule: '24/7' },
      { name: 'Las Lomas', address: 'Sucursal Las Lomas, Reynosa', mapsLink: '#', schedule: '24/7' },
      { name: 'Vista Hermosa', address: 'Sucursal Vista Hermosa, Reynosa', mapsLink: '#', schedule: '24/7' }
    ],
    testimonials: [
      { quote: "Atención rápida y profesional en urgencias. Muy agradecido con el trato recibido.", author: "Javier López" }
    ]
  },
  'medident-reynosa': {
    id: 'medident-reynosa',
    name: 'MediDent Consultorio Dental',
    shortName: 'MediDent',
    tagline: 'Odontología Especializada y Estética',
    heroTitle: 'Tu salud dental en manos de <span class="text-[var(--primary)]">especialistas</span>',
    heroImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2000&auto=format&fit=crop',
    description: 'MediDent Consultorio Dental en Reynosa. Especialistas en ortodoncia, endodoncia, cirugía bucal y estética dental. Agenda tu cita en segundos.',
    primaryColor: '#004b8d',
    secondaryColor: '#00a8e1',
    logoIcon: 'lucide:smile',
    favicon: '/favicon-medident.svg',
    fbLink: 'https://www.facebook.com/MediDentReynosa',
    igLink: 'https://www.instagram.com/medident__',
    address: 'Circuito Independencia Esquina Sierra Vallejo, Reynosa, Tamps.',
    mapsLink: 'https://maps.app.goo.gl/XvH7z7Y6Z8Q9W2v8',
    schedule: 'Lunes a Viernes: 10:00 AM - 7:00 PM | Sábados: 10:00 AM - 2:00 PM',
    services: [
      { title: 'Limpieza Ultrasónica', description: 'Eliminación de sarro y placa con tecnología avanzada.', icon: 'lucide:sparkles' },
      { title: 'Resinas Estéticas', description: 'Restauraciones dentales que lucen totalmente naturales.', icon: 'lucide:shield-check' },
      { title: 'Blanqueamiento', description: 'Recupera el brillo de tu sonrisa en una sola sesión.', icon: 'lucide:sun' }
    ],
    specialties: [
      { name: 'Ortodoncia', desc: 'Diseño de sonrisa con brackets y alineadores de última generación.', icon: 'lucide:smile' },
      { name: 'Endodoncia', desc: 'Tratamientos de conducto para salvar tus piezas dentales.', icon: 'lucide:heart-pulse' },
      { name: 'Cirugía Bucal', desc: 'Extracciones y cirugías de tercer molar (muelas del juicio) sin dolor.', icon: 'lucide:scissors' }
    ],
    bookingServices: [
      'Consulta General',
      'Limpieza Dental',
      'Ortodoncia (Brackets)',
      'Endodoncia',
      'Cirugía Bucal',
      'Blanqueamiento',
      'Prótesis / Coronas'
    ],
    branches: [
      {
        name: 'MediDent Reynosa',
        address: 'Circuito Independencia Esquina Sierra Vallejo, Reynosa, Tamps.',
        mapsLink: 'https://maps.app.goo.gl/XvH7z7Y6Z8Q9W2v8',
        schedule: 'Lunes a Viernes: 10:00 AM - 7:00 PM | Sábados: 10:00 AM - 2:00 PM'
      }
    ],
    testimonials: [
      { quote: "Excelente trato de los doctores, muy profesionales y la clínica está impecable.", author: "Juan Pérez" },
      { quote: "Me encantó mi tratamiento de ortodoncia, los resultados se notan muy rápido.", author: "María García" },
      { quote: "La mejor atención para mis hijos, los doctores son muy pacientes.", author: "Ricardo Treviño" }
    ]
  }
};

const clientId = import.meta.env.PUBLIC_CLIENT_ID || 'medident-reynosa';
export const currentClient = CLIENTS[clientId] || CLIENTS['medident-reynosa'];
