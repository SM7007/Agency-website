import { prisma } from "../../../backend/db";
import WorkClient from "./WorkClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | DevCraft Studio",
  description: "Projects we've built for real clients across web, mobile, and AI.",
};

export default async function WorkPage() {
  const rawProjects = await prisma.project.findMany({
    where: { visible: true },
    orderBy: { createdAt: "desc" },
  });

  const projects = rawProjects.map((p) => ({
    ...p,
    stack: JSON.parse(p.stack) as string[],
    built: JSON.parse(p.built) as string[],
  }));

  return <WorkClient initialProjects={projects} />;
}
