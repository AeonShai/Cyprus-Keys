import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@cypruskeys.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "changeme123";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, passwordHash },
  });

  console.log(`Admin user seeded: ${adminEmail}`);

  // Clear existing properties
  await prisma.property.deleteMany({});
  console.log("Cleared existing properties");

  // Seed properties with 2K images
  const properties = [
    {
      title: "Panoramic Pool Villa",
      location: "Girne, North Cyprus",
      city: "Girne",
      type: "villa" as const,
      status: "sale" as const,
      priceAmount: 285000,
      currency: "GBP",
      beds: 4,
      baths: 3,
      area: 210,
      photo: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2560&q=100",
      gallery: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2560&q=100",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2560&q=100",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&q=100",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2560&q=100",
      ],
      description:
        "Stunning 4-bedroom villa with infinity pool and panoramic sea-to-mountain views in Girne. Premium materials, private garden and covered parking.",
      features: [
        { label: "Property Type", value: "Villa" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "3" },
        { label: "Living Area", value: "210 mÃ‚Â²" },
        { label: "Plot Size", value: "650 mÃ‚Â²" },
        { label: "Year Built", value: "2022" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Pool", value: "Private Infinity Pool" },
        { label: "Parking", value: "2 Covered Spaces" },
      ],
      yearBuilt: 2022,
      isPublished: true,
    },
    {
      title: "Modern Seafront Residence",
      location: "Ã„Â°skele, North Cyprus",
      city: "Ã„Â°skele",
      type: "apartment" as const,
      status: "sale" as const,
      priceAmount: 195000,
      currency: "GBP",
      beds: 3,
      baths: 2,
      area: 130,
      photo: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=100",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=100",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2560&q=100",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2560&q=100",
      ],
      description:
        "Stylish 3-bedroom seafront residence in Ã„Â°skele with direct beach access, modern open-plan living and a large private terrace overlooking the Mediterranean.",
      features: [
        { label: "Property Type", value: "Apartment" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "2" },
        { label: "Living Area", value: "130 mÃ‚Â²" },
        { label: "Terrace", value: "45 mÃ‚Â²" },
        { label: "Year Built", value: "2023" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "View", value: "Sea Front" },
        { label: "Parking", value: "1 Space" },
      ],
      yearBuilt: 2023,
      isPublished: true,
    },
    {
      title: "Esentepe Luxury Villa",
      location: "Esentepe, North Cyprus",
      city: "Esentepe",
      type: "villa" as const,
      status: "sale" as const,
      priceAmount: 340000,
      currency: "GBP",
      beds: 4,
      baths: 3,
      area: 195,
      photo: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&q=100",
      gallery: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&q=100",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2560&q=100",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=2560&q=100",
      ],
      description:
        "Magnificent 4-bedroom villa set on elevated grounds in Esentepe with stunning golf course and sea views. Private pool, landscaped garden and premium smart-home system.",
      features: [
        { label: "Property Type", value: "Villa" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "3" },
        { label: "Living Area", value: "195 mÃ‚Â²" },
        { label: "Plot Size", value: "580 mÃ‚Â²" },
        { label: "Year Built", value: "2023" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Pool", value: "Private, 9Ãƒâ€”4 m" },
        { label: "Parking", value: "2 Spaces" },
      ],
      yearBuilt: 2023,
      isPublished: true,
    },
    {
      title: "TatlÃ„Â±su Exclusive Estate",
      location: "TatlÃ„Â±su, North Cyprus",
      city: "TatlÃ„Â±su",
      type: "villa" as const,
      status: "sale" as const,
      priceAmount: 475000,
      currency: "GBP",
      beds: 5,
      baths: 4,
      area: 280,
      photo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2560&q=100",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2560&q=100",
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=2560&q=100",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=2560&q=100",
      ],
      description:
        "An exclusive 5-bedroom estate in TatlÃ„Â±su with private infinity pool, sea views, a fully equipped outdoor kitchen and 800 mÃ‚Â² of landscaped grounds.",
      features: [
        { label: "Property Type", value: "Villa" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "5" },
        { label: "Bathrooms", value: "4" },
        { label: "Living Area", value: "280 mÃ‚Â²" },
        { label: "Plot Size", value: "800 mÃ‚Â²" },
        { label: "Year Built", value: "2024" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Pool", value: "Infinity Pool" },
        { label: "Parking", value: "3 Spaces" },
      ],
      yearBuilt: 2024,
      isPublished: true,
    },
    {
      title: "Girne Harbour Penthouse",
      location: "Girne, North Cyprus",
      city: "Girne",
      type: "penthouse" as const,
      status: "sale" as const,
      priceAmount: 420000,
      currency: "GBP",
      beds: 3,
      baths: 2,
      area: 175,
      photo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2560&q=100",
      gallery: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2560&q=100",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=100",
      ],
      description:
        "Spectacular rooftop penthouse overlooking Girne harbour with a wrap-around terrace, jacuzzi and panoramic sea views. Fully furnished to the highest standard.",
      features: [
        { label: "Property Type", value: "Penthouse" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "2" },
        { label: "Living Area", value: "175 mÃ‚Â²" },
        { label: "Terrace", value: "90 mÃ‚Â²" },
        { label: "Year Built", value: "2023" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Jacuzzi", value: "Yes" },
        { label: "Parking", value: "2 Spaces" },
      ],
      yearBuilt: 2023,
      floor: 10,
      totalFloors: 10,
      isPublished: true,
    },
    {
      title: "Lapta Hillside Villa",
      location: "Lapta, North Cyprus",
      city: "Lapta",
      type: "villa" as const,
      status: "sale" as const,
      priceAmount: 320000,
      currency: "GBP",
      beds: 3,
      baths: 2,
      area: 175,
      photo: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=2560&q=100",
      gallery: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=2560&q=100",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2560&q=100",
      ],
      description:
        "Private hillside villa with a large pool, mountain-to-sea views and mature gardens in peaceful Lapta, 15 minutes from Girne centre.",
      features: [
        { label: "Property Type", value: "Villa" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "2" },
        { label: "Living Area", value: "175 mÃ‚Â²" },
        { label: "Plot Size", value: "500 mÃ‚Â²" },
        { label: "Year Built", value: "2021" },
        { label: "Pool", value: "Private, 8Ãƒâ€”4 m" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Parking", value: "2 Spaces" },
      ],
      yearBuilt: 2021,
      isPublished: true,
    },
    {
      title: "GazimaÃ„Å¸usa Sea View Apartment",
      location: "GazimaÃ„Å¸usa, North Cyprus",
      city: "GazimaÃ„Å¸usa",
      type: "apartment" as const,
      status: "rent" as const,
      priceAmount: 1400,
      currency: "GBP",
      beds: 2,
      baths: 1,
      area: 90,
      photo: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2560&q=100",
      gallery: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2560&q=100",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2560&q=100",
      ],
      description:
        "Bright 2-bedroom apartment with sea views near the historic GazimaÃ„Å¸usa walls. Fully furnished, air-conditioned, available for annual or seasonal rental.",
      features: [
        { label: "Property Type", value: "Apartment" },
        { label: "Status", value: "For Rent" },
        { label: "Bedrooms", value: "2" },
        { label: "Bathrooms", value: "1" },
        { label: "Living Area", value: "90 mÃ‚Â²" },
        { label: "Floor", value: "4th of 7" },
        { label: "Furnished", value: "Yes" },
        { label: "View", value: "Sea View" },
        { label: "Heating", value: "Air Conditioning" },
        { label: "Parking", value: "1 Space" },
      ],
      yearBuilt: 2021,
      floor: 4,
      totalFloors: 7,
      isPublished: true,
    },
  ];

  for (const property of properties) {
    await prisma.property.create({ data: property });
  }

  console.log(`Seeded ${properties.length} properties`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
