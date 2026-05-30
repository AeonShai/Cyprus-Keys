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

  // Seed properties
  const properties = [
    {
      title: "Modern Sea-View Villa",
      location: "Girne, North Cyprus",
      city: "Girne",
      type: "villa" as const,
      status: "sale" as const,
      priceAmount: 285000,
      currency: "GBP",
      beds: 4,
      baths: 3,
      area: 210,
      photo:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80",
        "https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=1200&q=80",
      ],
      description:
        "Stunning modern villa with panoramic sea views in the heart of Girne. Finished to the highest standard with premium materials throughout, private pool, and landscaped garden.",
      features: [
        { label: "Property Type", value: "Villa" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "3" },
        { label: "Living Area", value: "210 m²" },
        { label: "Plot Size", value: "650 m²" },
        { label: "Year Built", value: "2022" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Heating", value: "Underfloor + Air Conditioning" },
        { label: "Parking", value: "2 Covered Spaces" },
      ],
      yearBuilt: 2022,
    },
    {
      title: "Sea View Apartment",
      location: "Gazimağusa, North Cyprus",
      city: "Gazimağusa",
      type: "apartment" as const,
      status: "sale" as const,
      priceAmount: 120000,
      currency: "GBP",
      beds: 2,
      baths: 1,
      area: 85,
      photo:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      ],
      description:
        "Bright and spacious 2-bedroom apartment with sea views in Gazimağusa's most sought-after residential complex. Close to the historic walled city and beaches.",
      features: [
        { label: "Property Type", value: "Apartment" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "2" },
        { label: "Bathrooms", value: "1" },
        { label: "Living Area", value: "85 m²" },
        { label: "Floor", value: "3rd of 6" },
        { label: "Year Built", value: "2020" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Heating", value: "Air Conditioning" },
        { label: "Parking", value: "1 Space" },
      ],
      yearBuilt: 2020,
      floor: 3,
      totalFloors: 6,
    },
    {
      title: "Luxury Penthouse",
      location: "Lefkoşa, North Cyprus",
      city: "Lefkoşa",
      type: "penthouse" as const,
      status: "sale" as const,
      priceAmount: 450000,
      currency: "GBP",
      beds: 3,
      baths: 2,
      area: 185,
      photo:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
        "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
      ],
      description:
        "Exceptional rooftop penthouse in central Lefkoşa with a large wrap-around terrace and city views. Premium finishes, smart home system and rooftop jacuzzi.",
      features: [
        { label: "Property Type", value: "Penthouse" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "2" },
        { label: "Living Area", value: "185 m²" },
        { label: "Terrace", value: "80 m²" },
        { label: "Year Built", value: "2023" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Heating", value: "Central + Underfloor" },
        { label: "Parking", value: "2 Spaces" },
      ],
      yearBuilt: 2023,
      floor: 12,
      totalFloors: 12,
    },
    {
      title: "Garden Bungalow",
      location: "İskele, North Cyprus",
      city: "İskele",
      type: "bungalow" as const,
      status: "sale" as const,
      priceAmount: 95000,
      currency: "GBP",
      beds: 2,
      baths: 1,
      area: 90,
      photo:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      ],
      description:
        "Charming single-storey bungalow in the fast-growing İskele region, surrounded by a mature garden. Ideal investment property with strong rental yield potential.",
      features: [
        { label: "Property Type", value: "Bungalow" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "2" },
        { label: "Bathrooms", value: "1" },
        { label: "Living Area", value: "90 m²" },
        { label: "Garden", value: "300 m²" },
        { label: "Year Built", value: "2019" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Heating", value: "Air Conditioning" },
        { label: "Parking", value: "1 Space" },
      ],
      yearBuilt: 2019,
    },
    {
      title: "Beachfront Apartment",
      location: "Girne, North Cyprus",
      city: "Girne",
      type: "apartment" as const,
      status: "rent" as const,
      priceAmount: 1200,
      currency: "GBP",
      beds: 1,
      baths: 1,
      area: 60,
      photo:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80",
        "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=1200&q=80",
      ],
      description:
        "Stylish 1-bedroom apartment steps from Girne harbour. Fully furnished and equipped, ideal for professionals or as a holiday rental investment.",
      features: [
        { label: "Property Type", value: "Apartment" },
        { label: "Status", value: "For Rent" },
        { label: "Bedrooms", value: "1" },
        { label: "Bathrooms", value: "1" },
        { label: "Living Area", value: "60 m²" },
        { label: "Floor", value: "2nd of 5" },
        { label: "Furnished", value: "Yes" },
        { label: "Heating", value: "Air Conditioning" },
        { label: "Parking", value: "1 Space" },
      ],
      yearBuilt: 2021,
      floor: 2,
      totalFloors: 5,
    },
    {
      title: "Hillside Villa with Pool",
      location: "Lapta, North Cyprus",
      city: "Lapta",
      type: "villa" as const,
      status: "sale" as const,
      priceAmount: 320000,
      currency: "GBP",
      beds: 3,
      baths: 2,
      area: 175,
      photo:
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=800&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=1200&q=80",
        "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=1200&q=80",
      ],
      description:
        "Private hillside villa with a large private pool and stunning mountain-to-sea views in the peaceful village of Lapta, just 15 minutes from Girne.",
      features: [
        { label: "Property Type", value: "Villa" },
        { label: "Status", value: "For Sale" },
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "2" },
        { label: "Living Area", value: "175 m²" },
        { label: "Plot Size", value: "500 m²" },
        { label: "Year Built", value: "2021" },
        { label: "Pool", value: "Private, 8×4 m" },
        { label: "Title Deed", value: "Turkish Kocan" },
        { label: "Parking", value: "2 Spaces" },
      ],
      yearBuilt: 2021,
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
