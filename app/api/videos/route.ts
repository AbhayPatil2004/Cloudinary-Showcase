
import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

export async function GET(request: NextRequest){

    console.log("Hello")
    try {
        const videos = await prisma.video.findMany({
            orderBy: {createdAt: "desc"}
        })

        console.log("Videos fetch")
        return NextResponse.json(videos)
    } catch (error) {

        console.log("error in fetching")
        return NextResponse.json({error: "Error fetching videos"}, {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}