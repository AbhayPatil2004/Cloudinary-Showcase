import { SignUp } from "@clerk/nextjs";


export default function page() {
    return (
        <div>
            <div>
                <div className="flex items-center justify-center w-full p-5 mb-10 bg-gray-900 text-3xl text-white">
                    Cloudinary Showcase
                </div>
            </div>

            <div className="flex min-h-screen items-center justify-center ">
                <div className="w-full max-w-md flex justify-center">
                    <SignUp
                        appearance={{
                            elements: {
                                rootBox: "mx-auto flex justify-center",
                                card: "shadow-xl rounded-2xl",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}