import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      let page = parseInt(searchParams.get("page"))
      if (!page) page=1
      const skip = (page-1)*16
      const data = await prisma.characters.findMany({
        take: 16,  
        skip,
        where: {
            fav: true,
          },       
      });
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error:', error);
      return NextResponse.json({ error: error.message });
    }
  }