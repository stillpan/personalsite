"use client";

import { useState } from "react";

export default function PhotoButton({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="select-none cursor-pointer"
      style={{
        transition: "transform 0.35s ease",
        transform: hovered ? "scale(1.06)" : "scale(1)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/icons/record_player.png"
        alt="record player"
        className="w-[26rem] sm:w-[32rem] object-contain"
        draggable={false}
      />
    </div>
  );
}
