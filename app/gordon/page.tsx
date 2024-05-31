
import { getGreeting } from "../lib/messagesgordon";
import ImageClassifier from "../ui/imageClassifier";
import Image from "next/image";

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
                  width= "1200"
                  height= "1200"
                  style={{
                  objectFit: "cover",
                  }}
          />
        </div>

        <div className="col-span-6">
          <p className="text-2xl font-extrabold pb-8 italic">
            {greeting.replaceAll(/\"/g, "")}
          </p>
        </div>

        <div className="col-span-6 mt-6 mb-6">
          <ImageClassifier />
        </div>

      </div>

    </main>
  );
}
