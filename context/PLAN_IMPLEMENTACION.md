# **Plan de Implementación V2: Sitio Médico de Alto Rendimiento**

Este plan integra optimizaciones específicas para Astro, manejo de datos críticos y una experiencia de usuario (UX) superior.

## **Fase 1: Configuración "Zero JS" y Estética**

*Prioridad: Velocidad máxima y tipografía profesional.*

1. **Iconografía Eficiente:** \* Instalación de `astro-icon`: `npx astro add astro-icon`.  
   * Uso de iconos de Lucide vía `astro-icon` para que se rendericen como SVG puro en el servidor.  
2. **Tipografía de Autoridad:**  
   * Implementación de **Plus Jakarta Sans** mediante `@fontsource/plus-jakarta-sans`. Es limpia, moderna y transmite confianza.  
3. **Configuración Global:** \* Establecer la zona horaria por defecto en el entorno (`America/Matamoros` o `America/Chicago` para Reynosa GMT-6).

## **Fase 2: Desarrollo UI con Imágenes Optimizadas**

*Prioridad: LCP (Largest Contentful Paint) bajo y cumplimiento legal.*

1. **Uso de `<Image />` de Astro:** \* Sustituir todas las etiquetas `<img>` por el componente nativo de Astro para generar formatos WebP/Avif automáticamente.  
2. **Aviso de Privacidad (Legal):** \* Creación de un `PrivacyPolicy.astro` en el footer. En México, el manejo de datos de salud es sensible (Ley Federal de Protección de Datos Personales).  
3. **Secciones de Confianza:** \* Badge de Cédula Profesional con diseño destacado.

## **Fase 3: Formulario de Citas con UX Pro (React/Preact)**

*Prioridad: Feedback visual y captura de datos limpia.*

1. **Estados del Formulario:**  
   * **Idle:** Botón estándar "Agendar Cita".  
   * **Loading:** Spinner activo y botón deshabilitado durante el `fetch`.  
   * **Success:** Mensaje personalizado: "¡Listo\! El Dr. \[Nombre\] recibió tu solicitud. Revisa tu WhatsApp en 2 minutos".  
2. **Captura de Tiempo:** \* Asegurar que el input de fecha y hora envíe un formato `ISO 8601` para evitar confusiones de zona horaria en el backend.

## **Fase 4: Inteligencia en n8n**

*Prioridad: Robustez del flujo de trabajo.*

1. **Validación de WhatsApp:** \* Nodo de función (Code) o Regex para verificar que el número tenga exactamente 10 dígitos antes de intentar disparar la API de WhatsApp.  
2. **Ajuste de Horario:** \* Configurar el nodo de Google Calendar para forzar el Timezone `America/Monterrey` o `America/Chicago` (Reynosa).  
3. **Confirmación Multicanal:** \* Webhook \-\> Validar Datos \-\> Crear Evento \-\> Enviar WhatsApp al Dr. \-\> Enviar Email al Paciente.

## **Checklist Final Actualizado**

* \[ \] Imágenes pasando por el componente `<Image />`.  
* \[ \] Iconos cargando sin JavaScript en el cliente (`astro-icon`).  
* \[ \] Formulario con validación de 10 dígitos para teléfonos mexicanos.  
* \[ \] Enlace al Aviso de Privacidad en el footer.  
* \[ \] Prueba de zona horaria: Agendar cita desde un móvil y verificar en Calendar.  
* \[ \] El Favicon: No dejes el logo de Astro. Haz un favicon de una cruz médica o el logo de la clínica en estilo Voxel (ya que te gusta ese arte) para que se vea único.  
* \[ \] Modo Oscuro: Tailwind lo hace súper fácil. Un "Dark Mode" para médicos que revisan su agenda de noche es un detalle muy fino.  
  