"use client"; // Bắt buộc phải có dòng này để dùng useState, useEffect

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Kiểm tra dữ liệu đầu vào
  if (!images || images.length === 0) return null;

  // Hàm chuyển ảnh tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Hàm lùi lại ảnh trước
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Logic tự động chạy (Auto-play) mỗi 5s
  useEffect(() => {
    // Tạo bộ đếm
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);

    // Dọn dẹp bộ đếm khi component bị hủy hoặc khi người dùng vừa bấm nút (để reset thời gian 5s)
    return () => clearInterval(slideInterval);
  }, [currentIndex]); // Chạy lại mỗi khi currentIndex thay đổi

  return (
    <div className="my-12 space-y-6">
      <h3 className="text-xl font-bold uppercase tracking-widest">Gallery</h3>

      {/* Khung chứa Slider */}
      <div className="relative w-full aspect-[16/9] group bg-gray-100 overflow-hidden">
        {/* --- ẢNH HIỂN THỊ --- */}
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            fill
            className="object-cover transition-all duration-700 ease-in-out"
            priority // Load ảnh này ngay lập tức
          />

          {/* Lớp phủ tối nhẹ để nút bấm dễ nhìn hơn (chỉ hiện khi hover) */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
        </div>

        {/* --- CÁC NÚT ĐIỀU HƯỚNG (Chỉ hiện khi hover vào ảnh) --- */}

        {/* Nút Trái */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/90 text-white hover:text-black backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0"
        >
          {/* Icon mũi tên trái (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        {/* Nút Phải */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/90 text-white hover:text-black backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0"
        >
          {/* Icon mũi tên phải (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* --- DOTS INDICATORS (Dấu chấm tròn bên dưới) --- */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6" // Active: Dài ra và màu trắng
                  : "bg-white/50 hover:bg-white/80" // Inactive: Mờ
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hiển thị số trang nhỏ: VD 1/3 */}
      <div className="text-right text-xs font-medium text-gray-400 tracking-widest">
        IMAGE {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
