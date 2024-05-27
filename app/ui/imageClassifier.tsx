"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/ui/loadingSpinner";


export default function ImageClassifier() {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [inputKey, setInputKey] = useState(new Date().toString());

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const formData = new FormData();
    formData.append("file", file as File);
    fetch("/api/classifystream", {
      method: "POST",
      body: formData,
    }).then((res) => {
      const reader = res.body?.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump(): any {
            return reader?.read().then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              const decoded = new TextDecoder("utf-8").decode(value);
              setResponse((prev) => `${prev}${decoded}`);
              return pump();
            });
          }
        },
      });
    });
  };

  const onReset = () => {
    setFile(null);
    setImage(null);
    setResponse("");
    setSubmitted(false);
    setInputKey(new Date().toString());
  };

  return (
    <div>
      {image ? (
        <img
          src={image}
          alt="An image to classify"
          className="mb-8 w-full object-contain"
        />
      ) : null}
      <form onSubmit={onSubmit}>


        <div className="transition-all w-36 grid grid-cols-3 gap-4 h-12 mx-auto ring-offset-1 ring-1 ring-stone-200/20 hover:ring-stone-100/60 rounded-full shadow-xl shadow-rose-800/10 hover:shadow-lg hover:shadow-green-800/20 bg-gradient-to-b from-stone-100 to-white">

          <div className="p-2 place-self-center transition-all w-10 h-10 col-span-1 shadow-sm hover:shadow-md rounded-full border border-slate-500/20 bg-gradient-to-t from-stone-700 to-stone-600">
            <UploadIcon/>
            
              <input key={inputKey} type="file" id="file_input" 
                      className="collapse"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          setFile(e.target?.files[0]);
                          setImage(URL.createObjectURL(e.target?.files[0]));
                        } else {
                          setFile(null);
                          setImage(null);
                        }
                      }}
                      />

          </div>
              
          <div className="place-self-center transition-all w-10 h-10 shadow-sm hover:shadow-md rounded-full border border-slate-500/20 bg-transparent col-span-1 text-center items-center content-center bg-gradient-to-t from-green-50 to-lime-50 hover:from-green-200 hover:to-lime-200">
            <button
              className="text-lg text-slate-400 hover:text-slate-500"
              type="submit"
              disabled={submitted || !file}
            >
            <EyeIcon/>
            </button>
          </div>

            
          <div className="place-self-center transition-all w-10 h-10 shadow-sm hover:shadow-md rounded-full border border-slate-500/20 col-span-1 text-center items-center content-center bg-gradient-to-t from-rose-50 to-pink-50 hover:from-rose-300 hover:to-pink-200">
            <button
              className="text-lg text-slate-400 hover:text-slate-500"
              type="button"
              onClick={onReset}
            >
              <ReloadIcon/>
            </button>
          </div>    
            
        </div>

        <p className="py-8 text-slate-800">
          {submitted && !response ? <LoadingSpinner /> : response}
        </p>

      </form>
    </div>
  );
}

function UploadIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto w-6 h-6 opacity-55 hover:opacity-65 text-slate-100">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

  )
}


function EyeIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="mx-auto w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
</svg>

  )
}

function ReloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mx-auto w-6 h-6 mt-1">
  <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
</svg>
  )
}

function PhotoIcon() {
  return (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mt-1">
  <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
  <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>
  )
}




