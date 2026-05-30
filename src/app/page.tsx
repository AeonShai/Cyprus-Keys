import Hero from "@/components/Hero";
import HeroSearch from "@/components/HeroSearch";
import ExploreSection from "@/components/ExploreSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesSection from "@/components/ServicesSection";
import LeadCTA from "@/components/LeadCTA";

export default function Home() {
  return (
    <main>

      {/* Section 1: Hero image + search panel (z-10, transparent bg) */}
      <section className="w-full relative z-10">
        <div className="max-w-[1275px] mx-auto px-6 pt-6 pb-12">
          <Hero />
          {/* Search panel overlapping image bottom */}
          <div className="mx-[4.72%] -mt-[7%] relative z-20">
            <HeroSearch />
          </div>
        </div>
      </section>

{/* Section 3: Featured off-plan projects */}
      <FeaturedProjects />

      {/* Section 4: Explore more houses */}
      <ExploreSection />

      {/* Section 5: Services / Value proposition */}
      <ServicesSection />

      {/* Section 6: Lead generation CTA */}
      <LeadCTA />

    </main>
  );
}

