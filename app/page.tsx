import ImageClassifier from "./ui/imageClassifier";
import { getGreeting } from "./lib/messages";
import Image from "next/image";

export default async function Home() {
  const greeting = await getGreeting();
  return (
    <main className="mx-auto md:w-2/3 min-h-screen items-center grid grid-cols-6 gap-4">
      <div className="col-span-2">
        <Image
                alt="Image"
                className="w-56 h-56 rounded-full"
                src="/david.jpg"
                width= "223"
                height= "226"
                style={{
                objectFit: "cover",
                }}
        />
      </div>

      <div className="col-span-4">
        <p className="text-xl pb-8 max-w-4xl italic">
          {greeting.replaceAll(/\"/g, "")}
        </p>
      </div>

      <ImageClassifier />
    </main>
  );
}
