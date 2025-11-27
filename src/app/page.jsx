// import HomeContent from "../components/HomeContent.jsx";

// export default function Page() {
//   return <HomeContent />;
// }

// src/app/page.jsx
import HeroSection from "@/components/ui/HeroSection";

export default function LandingPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-black">
      {/* Chỉ hiển thị HeroSection, không có Navbar hay nội dung nào khác */}
      <HeroSection />
    </main>
  );
}
