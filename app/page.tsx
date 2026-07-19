import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import StatsBanner from '@/components/StatsBanner';
import About from '@/components/About';
import Catalog from '@/components/Catalog';
import Services from '@/components/Services';
import Configurator from '@/components/Configurator';
import Industries from '@/components/Industries';
import Distributors from '@/components/Distributors';
import Quoter from '@/components/Quoter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBanner />
      <About />
      <Catalog />
      <Services />
      <Configurator />
      <Industries />
      <Distributors />
      <Quoter />
      <Footer />
    </>
  );
}
