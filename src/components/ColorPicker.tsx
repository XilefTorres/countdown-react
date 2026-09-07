import React, { useState, useEffect } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const DEFAULT_PRESETS = ["#ffffff", "#ff1a1a", "#ff9900", "#9900ff"];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onChange,
}) => {
  const [presets, setPresets] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("countdown-color-presets");
    if (saved) {
      try {
        setPresets(JSON.parse(saved));
      } catch (e) {
        setPresets(DEFAULT_PRESETS);
      }
    } else {
      setPresets(DEFAULT_PRESETS);
    }
  }, []);

  const handleAddPreset = () => {
    if (!presets.includes(color)) {
      const newPresets = [...presets, color];
      setPresets(newPresets);
      localStorage.setItem(
        "countdown-color-presets",
        JSON.stringify(newPresets),
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <label
        htmlFor="color-picker"
        className="text-[#cfe8d6] text-[13px] font-semibold tracking-[0.03em] select-none"
      >
        Color de números
      </label>

      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* Rueda principal de Color Personalizado */}
        <div
          className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1917] p-0.5 border border-[#2a2320] shadow-md hover:border-white hover:scale-105 transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-[#0e0c0a]"
          title="Color personalizado"
        >
          {/* Muestra de color con sombra interior y borde fino protector */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-inner border border-white/20 flex items-center justify-center">
            {/* Color seleccionado activo */}
            <div
              className="absolute inset-0 w-full h-full transition-colors duration-150"
              style={{ backgroundColor: color }}
            />

            {/* Icono de paleta con sombra paralela clara para alta visibilidad */}
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="relative z-10 text-neutral-600 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)] opacity-90"
            >
              <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
            </svg>

            {/* Reflejo estilo cristal */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/15 pointer-events-none" />
          </div>

          {/* Input invisible real */}
          <input
            type="color"
            id="color-picker"
            value={color}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          />
        </div>

        <div className="w-[1px] h-6 bg-[#2a2320]"></div>

        {/* Presets */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          {presets.map((p, idx) => (
            <button
              key={`${p}-${idx}`}
              onClick={() => onChange(p)}
              className="w-8 h-8 rounded-full border border-[#2a2320] hover:border-white transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shrink-0 shadow-sm"
              style={{ backgroundColor: p }}
              title={`Usar preset ${p}`}
              aria-label={`Color preset ${p}`}
            />
          ))}

          <button
            onClick={handleAddPreset}
            className="w-8 h-8 rounded-full border border-[#2a2320] bg-[#0e0c0a] text-[#e9e9e9] hover:bg-[#181310] hover:border-white hover:text-white transition-all hover:scale-105 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white shrink-0"
            title="Guardar color actual como preset"
            aria-label="Guardar preset"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
