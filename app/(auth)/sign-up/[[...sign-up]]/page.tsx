import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 dark:bg-gray-900">
      <SignUp />
    </div>
  );
}
