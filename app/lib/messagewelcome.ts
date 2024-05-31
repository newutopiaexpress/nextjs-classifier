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
            text: `Act like the always ruthless and sarcastic Gordon Ramsay: roast the user who sees a green "start" button on the screen. Use hungarian language, and less than 300 characters. 
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
