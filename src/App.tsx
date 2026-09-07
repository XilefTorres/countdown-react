import React, { useState, useEffect, useRef } from "react";
import { DisplayGroup } from "./components/DisplayGroup";
import { Colon } from "./components/Colon";
import { ColorPicker } from "./components/ColorPicker";

type Status = "stopped" | "running" | "paused";

export default function CountdownApp() {
  const [inputHH, setInputHH] = useState<string>("0");
  const [inputMM, setInputMM] = useState<string>("1");
  const [inputSS, setInputSS] = useState<string>("0");

  const [status, setStatus] = useState<Status>("stopped");
  const [remainingMs, setRemainingMs] = useState<number>(60000);
  const [numberColor, setNumberColor] = useState<string>("#ff1a1a");

  // Helper to convert hex to r, g, b
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : "255, 26, 26";
  };

  const rafRef = useRef<number | null>(null);
  const endPerfRef = useRef<number>(0);

  const handleInput =
    (setter: React.Dispatch<React.SetStateAction<string>>, max: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "") {
        setter("");
      } else {
        setter(Math.min(max, Math.max(0, parseInt(val) || 0)).toString());
      }
    };

  useEffect(() => {
    if (status === "stopped") {
      const hh = parseInt(inputHH) || 0;
      const mm = parseInt(inputMM) || 0;
      const ss = parseInt(inputSS) || 0;
      setRemainingMs((hh * 3600 + mm * 60 + ss) * 1000);
    }
  }, [inputHH, inputMM, inputSS, status]);

  const tick = () => {
    const now = performance.now();
    const left = endPerfRef.current - now;

    if (left <= 0) {
      setRemainingMs(0);
      setStatus("stopped");
      return;
    }

    setRemainingMs(left);
    rafRef.current = requestAnimationFrame(tick);
  };

  const handlePlay = () => {
    if (status === "running") return;
    if (remainingMs <= 0) return;

    endPerfRef.current = performance.now() + remainingMs;
    setStatus("running");
    rafRef.current = requestAnimationFrame(tick);
  };

  const handlePause = () => {
    if (status !== "running") return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setStatus("paused");
  };

  const handleStop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setStatus("stopped");
    const hh = parseInt(inputHH) || 0;
    const mm = parseInt(inputMM) || 0;
    const ss = parseInt(inputSS) || 0;
    setRemainingMs((hh * 3600 + mm * 60 + ss) * 1000);
  };

  const totalSeconds = Math.floor(Math.max(0, remainingMs) / 1000);
  const displayHH = Math.floor(totalSeconds / 3600);
  const displayMM = Math.floor((totalSeconds % 3600) / 60);
  const displaySS = totalSeconds % 60;
  const displayCS = Math.floor((Math.max(0, remainingMs) % 1000) / 10);

  // Clases compartidas para los botones (Tailwind)
  const btnClass =
    "flex items-center gap-2 py-2.5 px-4 rounded-lg border border-[#2a2320] bg-[#0e0c0a] text-[#e9e9e9] font-['Rajdhani',system-ui,sans-serif] text-[15px] font-semibold tracking-[0.02em] transition-colors duration-150 hover:not(:disabled):bg-[#181310] disabled:opacity-35 disabled:cursor-default focus-visible:outline focus-visible:outline-2 focus-visible:outline-white";

  // Clases para los inputs (Tailwind)
  const inputClass =
    "w-16 text-center font-['Rajdhani',system-ui,sans-serif] text-[20px] font-semibold text-[color:var(--theme-color)] bg-[#0e0c0a] border border-[#2a2320] rounded-lg py-1.5 px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[color:var(--theme-color)] disabled:opacity-40";
  const labelClass =
    "text-[#cfe8d6] text-[13px] font-semibold tracking-[0.03em]";

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center justify-center gap-[clamp(28px,5vw,64px)] p-8 bg-[#00ff00] font-['Rajdhani',system-ui,sans-serif]"
      style={{
        "--theme-color": numberColor,
        "--theme-color-rgb": hexToRgb(numberColor),
      } as React.CSSProperties}
    >
      <div
        className="flex items-end gap-[clamp(10px,2.4vw,28px)] flex-wrap justify-center"
        aria-hidden="true"
      >
        <DisplayGroup value={displayHH} flip={true} />
        <Colon />
        <DisplayGroup value={displayMM} flip={true} />
        <Colon />
        <DisplayGroup value={displaySS} flip={true} />
        <DisplayGroup value={displayCS} flip={false} isMinor={true} />
      </div>

      <section className="flex flex-col items-center gap-5 bg-[#060a07]/55 py-5 px-6 rounded-[14px]">
        <div className="flex gap-[22px] flex-wrap justify-center">
          <div className="flex flex-col items-center gap-1.5">
            <label htmlFor="inputHH" className={labelClass}>
              Horas
            </label>
            <input
              type="number"
              id="inputHH"
              min="0"
              max="24"
              value={inputHH}
              onChange={handleInput(setInputHH, 24)}
              disabled={status !== "stopped"}
              inputMode="numeric"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <label htmlFor="inputMM" className={labelClass}>
              Minutos
            </label>
            <input
              type="number"
              id="inputMM"
              min="0"
              max="59"
              value={inputMM}
              onChange={handleInput(setInputMM, 59)}
              disabled={status !== "stopped"}
              inputMode="numeric"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <label htmlFor="inputSS" className={labelClass}>
              Segundos
            </label>
            <input
              type="number"
              id="inputSS"
              min="0"
              max="59"
              value={inputSS}
              onChange={handleInput(setInputSS, 59)}
              disabled={status !== "stopped"}
              inputMode="numeric"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex gap-3.5 flex-wrap justify-center">
          <button
            className={btnClass}
            onClick={handlePlay}
            disabled={status === "running"}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="text-[#3ddc6a] shrink-0"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>{status === "paused" ? "Reanudar" : "Iniciar"}</span>
          </button>

          <button
            className={btnClass}
            onClick={handlePause}
            disabled={status !== "running"}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="text-[#ffb400] shrink-0"
            >
              <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
            </svg>
            <span>Pausar</span>
          </button>

          <button
            className={btnClass}
            onClick={handleStop}
            disabled={status === "stopped"}
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="currentColor"
              className="text-[#ff5252] shrink-0"
            >
              <path d="M6 6h12v12H6z" />
            </svg>
            <span>Detener</span>
          </button>
        </div>

        <div className="mt-4 border-t border-[#2a2320] pt-5 w-full flex justify-center">
          <ColorPicker color={numberColor} onChange={setNumberColor} />
        </div>
      </section>
    </main>
  );
}
