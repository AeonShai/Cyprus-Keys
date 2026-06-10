import Hero from "@/components/Hero";
import ExploreSection from "@/components/ExploreSection";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesSection from "@/components/ServicesSection";
import LeadCTA from "@/components/LeadCTA";
import db from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [heroProperties, exploreProperties] = await Promise.all([
    db.property.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, title: true, photo: true, beds: true, baths: true, area: true },
    }),
    db.property.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: 4,
      select: { id: true, title: true, location: true, priceAmount: true, currency: true, photo: true, description: true, status: true },
    }),
  ]);

  return (
    <main>

      {/* Hero: pulls up behind fixed navbar */}
      <div className="-mt-24">
        <Hero properties={heroProperties} />
      </div>

      {/* Section: Featured off-plan projects */}
      <FeaturedProjects />

      {/* Section: Explore featured homes */}
      <div className="mt-8">
        <ExploreSection properties={exploreProperties} />
      </div>

      {/* Section: Services / Value proposition */}
      <div className="mt-8">
        <ServicesSection />
      </div>

      {/* CTA above footer */}
      <LeadCTA />

    </main>
  );
}

