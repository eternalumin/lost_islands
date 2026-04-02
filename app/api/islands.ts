// pages/api/islands.ts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const islands = await prisma.islands.findMany();
      res.status(200).json(islands);
    } catch (error) {
      console.error("Error fetching islands:", error);
      res.status(500).json({ error: "Failed to fetch islands" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
