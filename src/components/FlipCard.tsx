import React, { useState, useEffect, useRef } from "react";

interface FlipCardProps {
  digit: string;
  flip?: boolean;
  isMinor?: boolean;
}

export const FlipCard: React.FC<FlipCardProps> = ({ digit, flip, isMinor }) => {
  const [current, setCurrent] = useState(digit);
  const [previous, setPrevious] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (digit !== current) {
      if (!flip) {
        setCurrent(digit);
        return;
      }
      setPrevious(current);
      setCurrent(digit);

      setIsFlipping(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsFlipping(true);
          // La animación total dura 480ms (240ms cayendo arriba + 240ms aterrizando abajo con delay)
          timeoutRef.current = setTimeout(() => {
            setIsFlipping(false);
          }, 480);
        });
      });
    }
  }, [digit, current, flip]);

  // Valores dinámicos
  const cardW = isMinor
    ? "w-[clamp(20px,3.5vw,36px)]"
    : "w-[clamp(48px,9vw,92px)]";
  const cardH = isMinor
    ? "h-[clamp(30px,5.5vw,54px)]"
    : "h-[clamp(74px,14vw,136px)]";
  const textSize = isMinor
    ? "text-[calc(clamp(30px,5.5vw,54px)*0.72)]"
    : "text-[calc(clamp(74px,14vw,136px)*0.72)]";

  // Colores Rojo LED
  const cardClasses = `relative rounded-[10px] [perspective:400px] shadow-[0_10px_18px_rgba(0,0,0,0.35)] text-[#ff1a1a] font-['DSEG7_Classic',monospace] ${cardW} ${cardH}`;
  const halfClasses =
    "absolute left-0 w-full h-1/2 overflow-hidden [backface-visibility:hidden] z-10";
  const textShadow =
    "[text-shadow:0_0_8px_currentColor,0_0_20px_rgba(255,26,26,0.6)]";

  return (
    <div className={cardClasses}>
      {/* Animaciones inyectadas para las dos mitades del flip */}
      <style>
        {`
          @keyframes flipTop {
            0% { transform: rotateX(0deg); filter: brightness(1); }
            100% { transform: rotateX(-90deg); filter: brightness(0.4); }
          }
          @keyframes flipBottom {
            0% { transform: rotateX(90deg); filter: brightness(0.4); }
            100% { transform: rotateX(0deg); filter: brightness(1); }
          }
        `}
      </style>

      {/* Fondo fijo simulando LED apagado */}
      <div
        className={`absolute inset-0 flex items-center justify-center text-[#ff1a1a]/15 z-0 ${textSize}`}
      >
        8
      </div>

      {/* Línea divisoria central */}
      <div className="absolute left-1 right-1 top-1/2 h-[2px] -translate-y-[1px] bg-black/60 z-30 pointer-events-none" />

      {/* 1. Mitad Superior Estática (Muestra el NUEVO número) */}
      <div
        className={`${halfClasses} top-0 bg-gradient-to-b from-[#2a1111] to-[#1a0a0a] rounded-t-[10px]`}
      >
        <span
          className={`absolute left-0 top-0 w-full ${cardH} flex items-center justify-center ${textSize} ${textShadow}`}
        >
          {current}
        </span>
      </div>

      {/* 2. Mitad Inferior Estática (Mantiene el número VIEJO hasta que termina la animación) */}
      <div
        className={`${halfClasses} bottom-0 bg-gradient-to-b from-[#1a0a0a] to-[#0f0505] rounded-b-[10px]`}
      >
        <span
          className={`absolute left-0 bottom-0 w-full ${cardH} flex items-center justify-center ${textSize} ${textShadow}`}
        >
          {isFlipping ? previous : current}
        </span>
      </div>

      {/* 3. Tarjeta Animada Superior (Cae mostrando el número VIEJO) */}
      {isFlipping && (
        <div
          className={`${halfClasses} top-0 bg-gradient-to-b from-[#2a1111] to-[#1a0a0a] rounded-t-[10px] origin-bottom z-20`}
          style={{ animation: "flipTop 240ms ease-in forwards" }}
        >
          <span
            className={`absolute left-0 top-0 w-full ${cardH} flex items-center justify-center ${textSize} ${textShadow}`}
          >
            {previous}
          </span>
        </div>
      )}

      {/* 4. Tarjeta Animada Inferior con Delay (Aterriza mostrando el NUEVO número) */}
      {isFlipping && (
        <div
          className={`${halfClasses} bottom-0 bg-gradient-to-b from-[#1a0a0a] to-[#0f0505] rounded-b-[10px] origin-top z-20`}
          style={{ animation: "flipBottom 240ms ease-out 240ms forwards" }}
        >
          <span
            className={`absolute left-0 bottom-0 w-full ${cardH} flex items-center justify-center ${textSize} ${textShadow}`}
          >
            {current}
          </span>
        </div>
      )}
    </div>
  );
};
