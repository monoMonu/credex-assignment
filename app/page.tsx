'use client'
import Hero from '@/components/homeSections/Hero';
import Workflow from '@/components/homeSections/Workflow';
import Testimonials from '@/components/homeSections/Testimonials';
import ContactForm from '@/components/homeSections/Contact';
import WhyChooseUs from '@/components/homeSections/WhyChooseUs';
import Navbar from '@/components/Navbar';
import ChatUI from '@/components/ChatUI';

export default function Home() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <section>
      <Navbar />
      <Hero />
      <Workflow />
      <WhyChooseUs />
      <Testimonials />
      <ContactForm />
      <ChatUI />
    </section>
  );
}
