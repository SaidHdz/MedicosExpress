export default function OmakaseLogo({ size = 80, color = "#e8c97e" }) {
  // Calculamos el ancho basado en una proporción 1.4:1 para que no se vea "chico" al ensanchar el lienzo
  const width = size * 1.4;
  
  return (
    <svg width={width} height={size} viewBox="0 0 140 100" fill="none" stroke={color} strokeWidth="10" strokeLinecap="square" style={{ margin: "0 auto", display: "block" }}>
      {/* Eje central vertical - Ahora en el centro de 140 */}
      <line x1="70" y1="10" x2="70" y2="90" />
      
      {/* Flecha Izquierda (Estructura lineal >) - Con más aire horizontal */}
      <polyline points="10,30 40,50 10,70" />
      
      {/* Flecha Derecha (Estructura lineal <) - Con más aire horizontal */}
      <polyline points="130,30 100,50 130,70" />
    </svg>
  );
}
