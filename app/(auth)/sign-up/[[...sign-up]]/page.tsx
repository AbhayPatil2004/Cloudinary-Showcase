import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
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
  );
}
