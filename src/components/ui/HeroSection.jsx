"use client";

import { useState, useRef } from "react";
import Link from "next/link";

// ĐƯỜNG DẪN VIDEO DUY NHẤT CỦA BẠN
const videoSrc = "/videos/video-2.mp4";

export default function HeroSection() {
  // Mặc định phải là TRUE (Tắt tiếng) thì trình duyệt mới cho tự chạy
  const [isMuted, setIsMuted] = useState(true);

  // Dùng ref để thao tác với thẻ video nếu cần
  const videoRef = useRef(null);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* --- VIDEO NỀN (1 VIDEO DUY NHẤT) --- */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop // Lặp lại liên tục
        muted={isMuted} // State quyết định có tiếng hay không
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      {/* --- LỚP PHỦ TỐI (OVERLAY) --- */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* --- NỘI DUNG CHÍNH --- */}
      <div className="relative z-20 container px-4 text-center text-white">
        <span className="block text-xs font-bold tracking-[0.3em] text-gray-300 mb-6 uppercase animate-fade-in-up">
          The Ultimate Collection
        </span>

        <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8 leading-none">
          SUPER
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            CARS
          </span>
          .
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-lg mx-auto font-light leading-relaxed mb-10">
          Nghệ thuật cơ khí. Tốc độ thuần khiết.
          <br />
          Khám phá những kiệt tác kỹ thuật đỉnh cao nhất thế giới.
        </p>

        <div>
          <Link
            href="/cars"
            className="inline-block px-10 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase hover:bg-red-600 hover:text-white transition-all duration-300 rounded-full"
          >
            Explore Now
          </Link>
        </div>
      </div>

      {/* --- NÚT BẬT/TẮT ÂM THANH (Góc dưới phải) --- */}
      <button
        onClick={toggleSound}
        className="absolute bottom-8 right-8 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all border border-white/20 group"
        title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
      >
        {isMuted ? (
          // Icon Loa Tắt (Mute)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        ) : (
          // Icon Loa Bật (Unmute) - Có sóng âm
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
            />
          </svg>
        )}
      </button>
    </section>
  );
}
