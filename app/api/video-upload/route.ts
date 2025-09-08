import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { buffer } from 'stream/consumers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number;
    [Key: string]: any
}

export async function POST(request: NextRequest) {

    const userId = auth();

    if (!userId) {
        return NextResponse.json(
            {
                error: "Unothrized"
            },
            {
                status: 401
            }
        )
    }


    try {

        if (
            !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET

        ) {
            return NextResponse.json({
                error: "Cloudinary credentials not found"
            },
                {
                    status: 500
                }
            )
        }

        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string
        const description = formData.get("description") as string
        const originalSize = formData.get("originalSize") as string

        if (!file) {
            return NextResponse.json(
                {
                    error: "File not found"
                },
                {
                    status: 400
                }

            )
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(

            (resolve, reject) => {
                const upload_stream = cloudinary.uploader.upload_stream(
                    { 
                        resource_type : "video" ,
                        folder: "video-upload" ,
                        transformation : [
                            { quality : "auto" , fetch_format : "mp4" }
                        ]
                        
                    },
                    (error, result) => {
                        if (error) {
                            reject(error)
                        }
                        else {
                            resolve(result as CloudinaryUploadResult)
                        }
                    }
                )
                upload_stream.end(buffer);
            }
        )

        const video = await prisma.video.create({
            data : {
                title ,
                description ,
                publicId : result.public_id ,
                OriginalSize : originalSize ,
                compressedSize : String(result.bytes) ,
                duration : result.duration || 0 
            }
        })

    }
    catch (error: any) {

        console.log("Error in uploading video")

        return NextResponse.json(
            {
                error: "Error in uploading video"
            },
            {
                status: 401
            }

        )
    }
    finally{
        await prisma.$disconnect();
    }
}