// src/components/car/CarListWithSearch.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CarListWithSearch({ initialCars, brandName }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCars = initialCars.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 gap-4">
        <h1 className="text-4xl font-black tracking-tighter uppercase">
          {brandName} <span className="text-gray-300">Collection</span>
        </h1>

        <div className="flex items-center justify-end relative">
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isSearchOpen ? "w-64 opacity-100 mr-2" : "w-0 opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="Tìm tên xe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-b border-black py-1 px-2 focus:outline-none bg-transparent text-sm font-medium placeholder-gray-400"
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCars.map((car) => (
            <Link
              key={car.slug}
              href={`/cars/${car.brand}/${car.slug}`}
              className="group block"
            >
              <div className="space-y-4 cursor-pointer">
                <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 rounded-sm">
                  <Image
                    src={car.cover_image}
                    alt={car.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    {car.price_vnd} VNĐ
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold leading-none group-hover:text-gray-600 transition-colors">
                    {car.title}
                  </h2>
                  <div className="flex gap-4 mt-3 text-sm text-gray-500 font-medium border-t border-gray-100 pt-3">
                    <span>{car.horsepower} HP</span>
                    <span className="w-px h-4 bg-gray-300"></span>
                    <span>{car.zero_to_sixty}s (0-60)</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p>Không tìm thấy xe nào.</p>
        </div>
      )}
    </div>
  );
}
