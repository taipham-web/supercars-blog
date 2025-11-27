import Image from "next/image";
import Link from "next/link";
import { getCarData } from "@/lib/cars";
import BrandNavbar from "@/components/ui/BrandNavbar";

export default function ComparePage({ searchParams }) {
  // 1. Lấy ID từ URL (VD: porsche/911-gt3)
  const car1Id = searchParams.car1; // brand/slug
  const car2Id = searchParams.car2;

  if (!car1Id || !car2Id) {
    return (
      <div className="text-center py-20">Vui lòng chọn 2 xe để so sánh.</div>
    );
  }

  // 2. Tách chuỗi để lấy brand và slug
  const [brand1, slug1] = car1Id.split("/");
  const [brand2, slug2] = car2Id.split("/");

  // 3. Lấy dữ liệu 2 xe
  const car1 = getCarData(brand1, slug1);
  const car2 = getCarData(brand2, slug2);

  // Hàm render 1 dòng so sánh
  const CompareRow = ({ label, val1, val2 }) => (
    <div className="grid grid-cols-3 border-b border-gray-100 py-4 hover:bg-gray-50">
      <div className="text-center font-bold text-gray-800 md:text-lg">
        {val1}
      </div>
      <div className="text-center text-xs text-gray-400 uppercase tracking-widest flex items-center justify-center">
        {label}
      </div>
      <div className="text-center font-bold text-gray-800 md:text-lg">
        {val2}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="sticky top-0 z-50">
        <BrandNavbar />
      </div>

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-black text-center mb-12 uppercase tracking-tighter">
          Head to Head
        </h1>

        {/* Ảnh và Tên xe */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[car1, car2].map((car, index) => (
            <div key={index} className="text-center">
              <div className="relative aspect-video mb-4 rounded-sm overflow-hidden bg-gray-100">
                <Image
                  src={car.frontmatter.cover_image}
                  alt="car"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl md:text-3xl font-black uppercase mb-1">
                {car.frontmatter.title}
              </h2>
              <p className="text-gray-500 font-bold">
                {car.frontmatter.price_vnd} VNĐ
              </p>
            </div>
          ))}
        </div>

        {/* Bảng so sánh chi tiết */}
        <div className="max-w-4xl mx-auto border-t border-gray-200">
          <CompareRow
            label="Engine"
            val1={car1.frontmatter.engine}
            val2={car2.frontmatter.engine}
          />
          <CompareRow
            label="Horsepower"
            val1={`${car1.frontmatter.horsepower} HP`}
            val2={`${car2.frontmatter.horsepower} HP`}
          />
          <CompareRow
            label="0-60 mph"
            val1={`${car1.frontmatter.zero_to_sixty}s`}
            val2={`${car2.frontmatter.zero_to_sixty}s`}
          />
          <CompareRow
            label="Top Speed"
            val1={`${car1.frontmatter.top_speed_mph} mph`}
            val2={`${car2.frontmatter.top_speed_mph} mph`}
          />
        </div>

        <div className="text-center mt-12">
          <Link
            href="/cars"
            className="inline-block px-8 py-3 bg-black text-white font-bold rounded-full uppercase text-sm tracking-widest hover:bg-gray-800"
          >
            Compare Other Cars
          </Link>
        </div>
      </div>
    </main>
  );
}
