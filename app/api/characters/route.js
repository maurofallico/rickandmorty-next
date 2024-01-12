import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const data = await prisma.characters.findMany({
    
    })
    return NextResponse.json(data)
  } catch (error) {
    console.log('error')
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