import Hero from "@/components/Hero";
import HeroSearch from "@/components/HeroSearch";
import ExploreSection from "@/components/ExploreSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesSection from "@/components/ServicesSection";
import LeadCTA from "@/components/LeadCTA";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const properties = await db.property.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, title: true, photo: true, beds: true, baths: true, area: true },
  });

  return (
    <main>

      {/* Section 1: Hero image + search panel (z-10, transparent bg) */}
      <section className="w-full relative z-10">
        <div className="max-w-[1275px] mx-auto px-6 pt-6 pb-12">
          <Hero properties={properties} />
          {/* Search panel: overlaps hero bottom on desktop, sits below on mobile */}
          <div className="mx-0 md:mx-[4.72%] mt-3 md:-mt-[7%] relative z-20">
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

