import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {

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