"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ComparePicker({ currentCar, allCars }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Loại bỏ xe hiện tại khỏi danh sách chọn (không ai so sánh xe với chính nó)
  const availableCars = allCars.filter((c) => c.slug !== currentCar.slug);

  const handleSelectCar = (targetCar) => {
    // Chuyển hướng đến trang so sánh với tham số trên URL
    // Ví dụ: /compare?car1=porsche/911-gt3&car2=ferrari/sf90
    const car1Id = `${currentCar.brand}/${currentCar.slug}`;
    const car2Id = `${targetCar.brand}/${targetCar.slug}`;

    router.push(`/compare?car1=${car1Id}&car2=${car2Id}`);
  };

  return (
    <>
      {/* Nút bấm mở Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 px-6 py-3 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-sm rounded-sm"
      >
        + Compare this car
      </button>

      {/* MODAL (Chỉ hiện khi isOpen = true) */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white text-black w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-lg flex flex-col">
            {/* Header Modal */}
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold uppercase tracking-widest">
                Select a car to compare
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl hover:text-red-500"
              >
                &times;
              </button>
            </div>

            {/* List xe để chọn */}
            <div className="overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableCars.map((car) => (
                <div
                  key={car.slug}
                  onClick={() => handleSelectCar(car)}
                  className="flex items-center gap-4 p-2 border border-gray-100 rounded hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="relative w-16 h-10 flex-shrink-0 bg-gray-200">
                    <Image
                      src={car.cover_image}
                      alt={car.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">
                      {car.brand}
                    </p>
                    <p className="font-bold text-sm group-hover:text-red-600">
                      {car.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
