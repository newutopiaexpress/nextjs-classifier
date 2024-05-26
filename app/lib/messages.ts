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
            text: `Introduce this concept in Hungarian language in less than 300 character AS if you were the ruthless and raw Gordon Ramsay:
            An image classifier that describes your image in the voice of Gordon Ramsay.
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
