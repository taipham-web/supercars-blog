// src/app/cars/[brand]/page.jsx
import { getCarsByBrand } from "@/lib/cars";
import BrandNavbar from "@/components/ui/BrandNavbar";
import CarListWithSearch from "@/components/car/CarListWithSearch";

export default function BrandPage({ params }) {
  // Lấy dữ liệu
  const cars = getCarsByBrand(params.brand);
  const brandName =
    params.brand.charAt(0).toUpperCase() + params.brand.slice(1);

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="sticky top-0 z-50">
        <BrandNavbar />
      </div>
      <div className="container mx-auto px-4 py-16">
        <CarListWithSearch initialCars={cars} brandName={brandName} />
      </div>
    </main>
  );
}
