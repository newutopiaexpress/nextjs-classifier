
import { getGreeting } from "./lib/messages";
import ImageClassifier from "./ui/imageClassifier";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  const greeting = await getGreeting();
  return (
    <main className="content-center min-h-screen px-6 md:px-9">

      <div className="mx-auto md:w-1/2 grid grid-cols-6">

        <div className=" col-span-6 mx-auto ml-0 mb-4 pt-9">
          <Image
                  alt="Image"
                  className="w-28 h-28 rounded-full"
                  src="/gordon.jpg"
                  width= "223"
                  height= "226"
                  style={{
                  objectFit: "cover",
                  }}
          />
        </div>

        <div className="col-span-6">
          <p className="text-lg italic">
            {greeting.replaceAll(/\"/g, "")}
          </p>
        </div>

        <div className="col-span-6 mt-4 mb-6">
          <Link href="/gordon">
            <button className="rounded-full border bg-green-200 border-green-300 px-4 py-2 text-sm">Start</button>
          </Link>
        </div>

      </div>

    </main>
  );
}
