// src/lib/cars.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getCarsByBrand(brandSlug) {
  // 1. Xác định đường dẫn folder của hãng (VD: content/porsche)
  const brandDirectory = path.join(contentDirectory, brandSlug);

  // 2. Kiểm tra nếu folder không tồn tại (tránh lỗi crash app)
  if (!fs.existsSync(brandDirectory)) {
    return [];
  }

  // 3. Đọc tên tất cả các file trong folder đó
  const fileNames = fs.readdirSync(brandDirectory);

  // 4. Lặp qua từng file để lấy dữ liệu
  const allCars = fileNames
    .map((fileName) => {
      // Chỉ xử lý file .mdx
      if (!fileName.endsWith(".mdx")) return null;

      // Đọc nội dung file
      const fullPath = path.join(brandDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Dùng gray-matter để tách phần Header (frontmatter)
      const { data } = matter(fileContents);

      // Trả về object chứa thông tin xe
      return {
        slug: fileName.replace(/\.mdx$/, ""), // Xóa đuôi .mdx để làm ID (VD: 911-GT3)
        brand: brandSlug,
        ...data, // Bung toàn bộ dữ liệu (title, price_vnd, cover_image...)
      };
    })
    .filter(Boolean); // Lọc bỏ các giá trị null

  return allCars;
}

export function getCarData(brand, slug) {
  const fullPath = path.join(contentDirectory, brand, `${slug}.mdx`);

  // Kiểm tra file có tồn tại không
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Dùng gray-matter tách metadata và nội dung bài viết
  const { data, content } = matter(fileContents);

  return {
    slug,
    brand,
    frontmatter: data, // Chứa title, price, engine...
    content, // Chứa nội dung bài viết và các thẻ <ImageGallery>
  };
}

export function getAllCars() {
  const brands = fs.readdirSync(contentDirectory);
  let allCars = [];

  brands.forEach((brand) => {
    const brandPath = path.join(contentDirectory, brand);
    // Kiểm tra xem có phải folder không (tránh file .DS_Store)
    if (fs.statSync(brandPath).isDirectory()) {
      const cars = getCarsByBrand(brand);
      allCars = [...allCars, ...cars];
    }
  });

  return allCars;
}
