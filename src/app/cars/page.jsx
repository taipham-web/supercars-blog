import { getAllCars } from "@/lib/cars";
import BrandNavbar from "@/components/ui/BrandNavbar";
import CarListWithSearch from "@/components/car/CarListWithSearch";

export default function AllCarsPage() {
  // 1. Lấy danh sách TOÀN BỘ xe từ tất cả các hãng
  const cars = getAllCars();

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <BrandNavbar />
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-16">
        {/* Tái sử dụng component hiển thị & tìm kiếm */}
        <CarListWithSearch
          initialCars={cars}
          brandName="All Supercars" // Đặt tên tiêu đề là "All Supercars"
        />
      </div>
    </main>
  );
}
