import Navigation from '@/components/sections/Navigation';
import Hero from '@/components/sections/Hero';
import Benefits from '@/components/sections/Benefits';
import Product from '@/components/sections/Product';
import Research from '@/components/sections/Research';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Benefits />
      <Product />
      <Research />
    </main>
  );
}