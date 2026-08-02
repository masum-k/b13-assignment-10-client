import Librarian from "@/components/Librarian";
import BestSellingBooks from "@/components/BestSellingBooks";
import BooksCatalog from "@/components/BooksCatalog";
import HeroSection from "@/components/HeroSection";
import NewReleases from "@/components/NewReleases";
import Newsletter from "@/components/Newsletter";
import Offer from "@/components/Offer";
import PromoBanners from "@/components/PromoBanners";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PromoBanners />
      <BestSellingBooks />
      <BooksCatalog />
      <NewReleases />
      <Offer />
      <Librarian />
      <Newsletter />
    </>
  );
}
