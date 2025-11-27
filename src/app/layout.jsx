import "./globals.css"; // Nếu bạn chưa có file css này thì có thể xóa dòng này đi tạm thời
import Footer from "@/components/ui/Footer.jsx";
export const metadata = {
  title: "Supercar Blog",
  description: "Blog về siêu xe",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
