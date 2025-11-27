import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
// SỬA LỖI: Gom hết vào 1 dòng import duy nhất
import { getCarData, getAllCars } from "@/lib/cars";
import ComparePicker from "@/components/car/ComparePicker";

import SpecTable from "@/components/car/SpecTable";
import ImageGallery from "@/components/car/ImageGallery";

export default function CarDetailPage({ params }) {
  const { brand, slug } = params;

  // 1. Lấy dữ liệu xe hiện tại
  const car = getCarData(brand, slug);

  // 2. Lấy danh sách tất cả xe (để dùng cho nút so sánh)
  const allCars = getAllCars();

  if (!car) {
    return notFound();
  }

  const { frontmatter, content } = car;

  return (
    <main className="min-h-screen bg-white text-black pb-20">
      {/* --- PHẦN 1: HERO HEADER --- */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={frontmatter.cover_image}
          alt={frontmatter.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
          <div className="container mx-auto px-4 pb-12 text-white">
            <Link
              href={`/cars/${brand}`}
              className="inline-block mb-6 text-sm font-bold uppercase tracking-widest hover:text-red-500 transition-colors"
            >
              ← Back to {brand}
            </Link>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
              {frontmatter.title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-300">
              {frontmatter.price_vnd} VNĐ
            </p>

            {/* --- THÊM NÚT SO SÁNH (Lần trước bạn quên đoạn này) --- */}
            <ComparePicker
              currentCar={{ ...frontmatter, slug, brand }}
              allCars={allCars}
            />
          </div>
        </div>
      </div>

      {/* --- PHẦN 2: NỘI DUNG BÀI VIẾT (MDX) --- */}
      <div className="container mx-auto px-4 mt-16 max-w-4xl">
        <article className="prose prose-lg prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-widest prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed max-w-none">
          <MDXRemote
            source={content}
            components={{
              SpecTable: (props) => <SpecTable {...props} data={frontmatter} />,
              ImageGallery,
            }}
          />
        </article>
      </div>
    </main>
  );
}
