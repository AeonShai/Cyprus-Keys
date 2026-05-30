import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import db from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const projects = await db.project.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const project = await db.project.create({ data: body });
  return NextResponse.json(project, { status: 201 });
}
