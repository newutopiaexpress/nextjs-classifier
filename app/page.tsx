import ImageClassifier from "./ui/imageClassifier";
import { getGreeting } from "./lib/messages";
import Image from "next/image";

export default async function Home() {
  const greeting = await getGreeting();
  return (
    <main className="content-center h-screen">

      <div className="mx-auto md:w-1/2 grid grid-cols-6">

        <div className=" col-span-6 mx-auto ml-0 mb-4 pt-9">
          <Image
                  alt="Image"
                  className="w-28 h-28 rounded-full"
                  src="/david.jpg"
                  width= "223"
                  height= "226"
                  style={{
                  objectFit: "cover",
                  }}
          />
        </div>

        <div className="col-span-6">
          <p className="text-lg pb-8 italic">
            {greeting.replaceAll(/\"/g, "")}
          </p>
        </div>

        <div className="col-span-6 mt-6 mb-9">
          <ImageClassifier />
        </div>

      </div>

    </main>
  );
}
