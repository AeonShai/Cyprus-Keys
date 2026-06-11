import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const city = searchParams.get("city");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minBeds = searchParams.get("minBeds");

  const properties = await db.property.findMany({
    where: {
      isPublished: true,
      ...(searchParams.get("region") ? { region: searchParams.get("region")! } : {}),
      ...(type ? { type: type as never } : {}),
      ...(status ? { status: status as never } : {}),
      ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
      ...(minPrice || maxPrice
        ? {
            priceAmount: {
              ...(minPrice ? { gte: Number(minPrice) } : {}),
              ...(maxPrice ? { lte: Number(maxPrice) } : {}),
            },
          }
        : {}),
      ...(minBeds ? { beds: { gte: Number(minBeds) } } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(properties);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const property = await db.property.create({ data: body });
  return NextResponse.json(property, { status: 201 });
}
