import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request) {
  
    try {
       const { searchParams } = new URL(request.url);
      /* let page = parseInt(searchParams.get("page"))
       if (!page) page=1 
      const skip = (page-1)*14 */
      let gender = searchParams.get("gender")
      let whereCondition = {fav: true, gender: gender}
      if (!gender || gender==="all") whereCondition = {fav: true}
      const data = await prisma.characters.findMany({
        /* take: 14,  
        skip, */
        where: whereCondition,
          orderBy: {
            id: 'asc'
          },     
      });
      return NextResponse.json(data);
    } catch (error) {
      console.error('Error:', error);
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
        const response = NextResponse.json("Character updated!");
        response.setHeader('Cache-Control', 'no-store');

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message });
  }
}
