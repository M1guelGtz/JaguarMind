import Navbar from "@/views/components/Navbar";
import HeroSection from "@/views/components/HeroSection";
import CommunitySection from "@/views/components/CommunitySection";
import TeamSection from "@/views/components/TeamSection";
import Footer from "@/views/components/Footer";
import NeonBackground from "@/views/components/NeonBackground";
import FloatingJaguar from "@/views/components/FloatingJaguar";

export default function Home() {
  return (
    <>
      <NeonBackground />
      <FloatingJaguar />
      <Navbar />
      <main>
        <HeroSection />
        <CommunitySection />
        <TeamSection />
      </main>
      <Footer />
    </>
  );
}
