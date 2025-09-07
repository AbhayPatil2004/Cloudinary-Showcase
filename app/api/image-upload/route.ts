import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { buffer } from 'stream/consumers';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

interface CloudinaryUploadResult {
    public_id: string;
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
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json(
                {
                    error: "Error in uploading file"
                },
                {
                    status: 400
                }

            )
        }
        
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const result = await new Promise<CloudinaryUploadResult>(

            ( resolve , reject ) => {
                const upload_stream = cloudinary.uploader.upload_stream(
                    { folder : "next-cloudinary-upload"},
                    ( error , result ) => {
                        if( error ){
                            reject(error)
                        }
                        else{
                            resolve( result as CloudinaryUploadResult)
                        }
                    }
                )
                upload_stream.end(buffer);
            }
        )

        return NextResponse.json( { pubicId : result.public_id } , { status : 200 })

    }
    catch (error: any) {
        return NextResponse.json(
            {
                error: "Error in uploading file"
            },
            {
                status: 401
            }

        )
    }
}