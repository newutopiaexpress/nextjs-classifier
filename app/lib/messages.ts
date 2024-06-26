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
            text: `Describe in Hungarian language as if you were David Attenborogh in less than 300 characters: an animal gets to know a digital device with three buttons and should use the image upload button.`,
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
