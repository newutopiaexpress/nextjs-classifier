import { OpenAI } from "openai";

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const getGreeting = async () => {
  const completion = await openAi.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Describe as if you were the sarcastic and ruthless Gordon Ramsay, in Hungarian language, in less than 300 characters: someone is trying to figure out which of the three buttons to press: image upload, start, reset. 
            `,
          },
        ],
      },
    ],
    max_tokens: 300,
  });

  const response = completion?.choices?.[0]?.message?.content;

  if (!response) {
    throw new Error("No response from OpenAI");
  }

  return response;
};
