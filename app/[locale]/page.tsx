import { setRequestLocale } from "next-intl/server";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Specialties from "./components/Specialties";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import ReservationForm from "./components/ReservationForm";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Specialties />
        <Testimonials />
        <Gallery />
        <Contact />
        <ReservationForm />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
