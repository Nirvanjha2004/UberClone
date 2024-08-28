import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
async function seed() {
    const alice = await prisma.user.upsert({
        where: {
            number: 111,
        },
        update: {},
        create: {
            number: 111, 
            password: 'nirvanjha', //Add bcrypjs to hash password,
            name: 'alice',
            Balance:{
                create:{
                    amount: 20000,
                    locked: 0
                }
            }, 
            OnRampTransaction:{
                create:{
                    status: "Success",
                    token: "token 1", 
                    startTime: new Date(),
                    provider: "HDFC",
                }
            }
        },
        
    })
    console.log(alice);
}

seed().then(async ()=>{
    await prisma.$disconnect();
}).catch(async (e)=>{
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
})

export default seed