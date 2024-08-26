
import { getGreeting } from "./lib/messagewelcome";
import ImageClassifier from "./ui/imageClassifier";
import Image from "next/image";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";

export default async function Page() {
  const greeting = await getGreeting();
  return (
    <main className="bg-transparent content-center min-h-screen px-6 md:px-9 h-screen w-full bg-cover bg-fixed bg-[url('/gordonbig.png')]">

      <div className="bg-transparent md:max-w-[400px] grid grid-cols-6">

        <div className="col-span-6">
          <p className="text-2xl text-stone-100 italic [text-shadow:_0_1px_0_rgb(0_0_0_/_60%)]">
            {greeting.replaceAll(/\"/g, "")}*
          </p>
          <p className="text-xs text-stone-100/60">*AI generált szöveg</p>
        </div>

        <div className="col-span-6 mt-4 mb-6">
          <Link href="/gordon">
            <button className="rounded-full border bg-green-400 border-green-400 px-6 py-2 text-xl">Start</button>
          </Link>
        </div>

      </div>

    </main>
  );
}
