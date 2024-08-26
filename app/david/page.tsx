
import { getGreeting } from "../lib/messages";
import ImageClassifier from "../ui/imageClassifier";
import Image from "next/image";

export default async function Page() {
  const greeting = await getGreeting();
  return (
    <main className="content-center min-h-screen px-6 md:px-9 h-screen w-full bg-cover bg-fixed bg-[url('/david.png')]">

      <div className="md:max-w-[500px] grid grid-cols-6">

        <div className="col-span-6">
          <p className="text-lg pb-8 italic">
            {greeting.replaceAll(/\"/g, "")}
          </p>

        </div>

        <div className="col-span-6 mt-16 mb-6">
          <ImageClassifier />
        </div>

      </div>

    </main>
  );
}
