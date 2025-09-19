import { SignUp } from "@clerk/nextjs";


export default function page(){
    return (
        <div className="h-full flex justify-center items-center">
            <SignUp/>
        </div>
    )
}