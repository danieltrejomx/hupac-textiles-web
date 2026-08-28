import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBanner from '@/components/StatsBanner';
import CatalogCarousel from '@/components/CatalogCarousel';
import Configurator from '@/components/Configurator';
import Quoter from '@/components/Quoter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBanner />
      <CatalogCarousel />
      <Configurator />
      <Quoter />
      <Footer />
    </>
  );
}
