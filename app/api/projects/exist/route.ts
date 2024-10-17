import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Handles the GET request to retrieve the last active project ID for a user.
 * If the user does not have a last active project, it retrieves the first project ID associated with the user.
 */
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = authHeader.split("Bearer ")[1];
    if (!userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { lastActiveProject: true },
    });

    if (!user || !user.lastActiveProject) {
      const firstProject = await prisma.project.findFirst({
        where: { userId },
        select: { id: true },
      });

      return NextResponse.json({ projectId: firstProject?.id });
    }

    return NextResponse.json({ projectId: user.lastActiveProject });
  } catch (error) {
    console.error("CHECK_PROJECT_EXISTENCE", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
