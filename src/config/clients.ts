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
  branches: string[];
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
    branches: ['Sucursal Principal - Reynosa']
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
    mapsLink: '#',
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
    branches: ['Las Fuentes']
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
    branches: ['La Joya', 'José López Portillo', 'Las Lomas', 'Vista Hermosa']
  }
};

const clientId = import.meta.env.PUBLIC_CLIENT_ID || 'dental-advance';
export const currentClient = CLIENTS[clientId] || CLIENTS['dental-advance'];
