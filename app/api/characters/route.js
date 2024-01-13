import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    let page = parseInt(searchParams.get("page"))
    if (!page) page=1
    const skip = (page-1)*14
    const data = await prisma.characters.findMany({
      take: 14,  
      skip,
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(request) {
    try {
        const data = await request.json();
        await prisma.characters.createMany({
          data: data,
        });
        return NextResponse.json("Character created!");
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message });
      }
}

export async function PUT(request) {
  try {
    const data = await request.json();
      await prisma.characters.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          status: data.status,
          species: data.species,
          gender: data.gender,
          origin: data.origin,
          image: data.image,
          fav: data.fav,
        },
      });
      return NextResponse.json("Character updated!");
    } catch (error) {
      console.log(error)
      return NextResponse.json({ error: error.message });
    }
}