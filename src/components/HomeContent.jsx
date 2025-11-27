import HeroSection from "./ui/HeroSection";
import BrandNavbar from "./ui/BrandNavbar";

export default function HomeContent() {
  return (
    <main className="min-h-screen bg-white selection:bg-black selection:text-white">
      <HeroSection />

      <div className="sticky top-0 z-50">
        <BrandNavbar />
      </div>

      <div className="container mx-auto px-4 py-20 min-h-[50vh]">
        <p className="text-center text-gray-300 font-light text-sm tracking-widest uppercase">
          (Select a brand to view models)
        </p>
      </div>
    </main>
  );
}
