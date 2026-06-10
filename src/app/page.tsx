import Hero from "@/components/Hero";
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

      {/* Hero: full-width, full-screen */}
      <Hero properties={properties} />

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

