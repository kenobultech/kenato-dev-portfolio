import HeroSection from "./hero/page";
import MainLayout from "./components/MainLayout"; // Make sure this path is correct

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
    </MainLayout>
  );
}