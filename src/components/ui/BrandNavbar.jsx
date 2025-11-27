import Link from "next/link";
// Không cần import Image nữa

const brands = [
  { name: "All", slug: "all" },
  { name: "Porsche", slug: "porsche" },
  { name: "Ferrari", slug: "ferrari" },
  { name: "Lamborghini", slug: "lamborghini" },
  { name: "BMW", slug: "bmw" },
  { name: "McLaren", slug: "mclaren" },
];

export default function BrandNavbar() {
  return (
    <nav className="w-full py-6 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all">
      <div className="container mx-auto px-6">
        {/* Container chính: Dùng Flex để dàn Logo sang trái, Menu sang phải (hoặc giữa) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* --- 1. LOGO TEXT (Thay cho ảnh) --- */}
          <Link href="/" className="group">
            <h1 className="text-2xl font-black tracking-tighter italic">
              SUPER
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500 group-hover:from-red-500 group-hover:to-orange-400 transition-all">
                CARS
              </span>
              .
            </h1>
          </Link>

          {/* --- 2. MENU CÁC HÃNG XE --- */}
          <ul className="flex gap-6 md:gap-8 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-hide">
            {brands.map((brand) => (
              <li key={brand.slug} className="flex-shrink-0">
                <Link
                  href={brand.slug === "all" ? "/cars" : `/cars/${brand.slug}`}
                  className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors duration-300 relative group py-2"
                >
                  {brand.name}
                  {/* Hiệu ứng gạch chân chạy ra từ giữa */}
                  <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-red-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
