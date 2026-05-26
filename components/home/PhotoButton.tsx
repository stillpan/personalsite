"use client";

export default function PhotoButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="About Yuki"
      className="cursor-pointer focus:outline-none hover:scale-105 transition-transform duration-300"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/icons/record_player.png"
        alt="record player"
        className="w-[26rem] sm:w-[32rem] object-contain"
      />
    </button>
  );
}
