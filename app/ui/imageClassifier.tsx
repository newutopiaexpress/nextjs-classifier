"use client";

import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";


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


        <div className="mx-auto grid grid-cols-4">

          <div className="col-span-2 text-left">
              <input key={inputKey} type="file" id="file_input" className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full
                file:text-sm file:font-semibold
                file:bg-stone-800 file:text-stone-200 file:border file:border-stone-800
                hover:file:bg-stone-800
              "
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
              
          <div className="col-span-1 text-left">
            <button
              className={`${
                submitted || !file ? "opacity-50" : " hover:bg-gray-100"
              } bg-green-200 hover:bg-green-300 mr-4 text-slate-700 hover:text-slate-600 font-semibold py-2 px-4 border border-green-400 rounded-full shadow`}
              type="submit"
              disabled={submitted || !file}
            >
            <EyeIcon/> Start
            </button>
          </div>

            
          <div className="col-span-1 text-right">
            <button
              className="rounded-full bg-white hover:bg-red-100 text-slate-400 hover:text-red-400 font-semibold py-2 px-4 border border-red-100 shadow"
              type="button"
              onClick={onReset}
            >
              <ReloadIcon/> Új kép
            </button>
          </div>    
            
        </div>

        <p className="py-8 text-slate-800">
          {submitted && !response ? "Mr. Ramsay hívása..." : response}
        </p>

      </form>
    </div>
  );
}


function EyeIcon() {
  return (
    <svg className="float-left mt-1 mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
  )
}

function ReloadIcon() {
  return (
    <svg className="float-left mt-1 mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>

  )
}


