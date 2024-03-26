const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync('./api/db.json', 'utf8'));

  for (const item of data.characters) {
    await prisma.characters.create({
      data: {
        name: item.name,
        status: item.status,
        species: item.species,
        gender: item.gender,
        origin: item.origin.name,
        image:  item.image
      },
    });
  }

  console.log('Datos importados correctamente.');
  prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});