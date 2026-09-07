import React from "react";

export const Colon: React.FC = () => {
  const dotStyle = {
    backgroundColor: "var(--theme-color)",
    boxShadow: "0 0 8px var(--theme-color), 0 0 20px rgba(var(--theme-color-rgb), 0.6)",
  };

  return (
    <div className="flex flex-col items-center">
      <div className="h-[clamp(74px,14vw,136px)] flex flex-col items-center justify-evenly">
        <i className="w-[clamp(7px,1vw,10px)] h-[clamp(7px,1vw,10px)] rounded-full" style={dotStyle}></i>
        <i className="w-[clamp(7px,1vw,10px)] h-[clamp(7px,1vw,10px)] rounded-full" style={dotStyle}></i>
      </div>
      <div className="font-semibold text-[clamp(10px,1.6vw,15px)] tracking-[0.04em] invisible">
        :
      </div>
    </div>
  );
};
