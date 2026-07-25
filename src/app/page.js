import BestSellingBooks from "@/components/BestSellingBooks";
import BooksCatalog from "@/components/BooksCatalog";
import HeroSection from "@/components/HeroSection";
import PromoBanners from "@/components/PromoBanners";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PromoBanners />
      <BestSellingBooks />
      <BooksCatalog />
    </>
  );
}
