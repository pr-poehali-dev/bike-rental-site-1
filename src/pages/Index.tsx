import Layout from '@/components/site/Layout';
import HeroSection from '@/components/site/sections/HeroSection';
import FeaturesSection from '@/components/site/sections/FeaturesSection';
import CatalogSection from '@/components/site/sections/CatalogSection';
import PricingSection from '@/components/site/sections/PricingSection';
import CompareSection from '@/components/site/sections/CompareSection';
import ReviewsSection from '@/components/site/sections/ReviewsSection';
import AboutSection from '@/components/site/sections/AboutSection';
import LocationsSection from '@/components/site/sections/LocationsSection';
import HowItWorksSection from '@/components/site/sections/HowItWorksSection';
import BookingSection from '@/components/site/sections/BookingSection';
import GallerySection from '@/components/site/sections/GallerySection';
import FaqSection from '@/components/site/sections/FaqSection';
import PartnersSection from '@/components/site/sections/PartnersSection';
import BlogSection from '@/components/site/sections/BlogSection';
import ContactsSection from '@/components/site/sections/ContactsSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CatalogSection />
      <PricingSection />
      <CompareSection />
      <ReviewsSection />
      <AboutSection />
      <LocationsSection />
      <HowItWorksSection />
      <BookingSection />
      <GallerySection />
      <FaqSection />
      <PartnersSection />
      <BlogSection />
      <ContactsSection />
    </Layout>
  );
};

export default Index;
