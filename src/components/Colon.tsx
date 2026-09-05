import React from "react";

export const Colon: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="h-[clamp(74px,14vw,136px)] flex flex-col items-center justify-evenly">
      <i className="w-[clamp(7px,1vw,10px)] h-[clamp(7px,1vw,10px)] rounded-full bg-[#000000]"></i>
      <i className="w-[clamp(7px,1vw,10px)] h-[clamp(7px,1vw,10px)] rounded-full bg-[#000000]"></i>
    </div>
    <div className="text-[#000000] font-semibold text-[clamp(10px,1.6vw,15px)] tracking-[0.04em] invisible">
      :
    </div>
  </div>
);
