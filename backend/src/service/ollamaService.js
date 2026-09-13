import ENV from "../lib/env.js";

export async function generateSummary(messages) {
  try {
    const conversation = messages
      .map((message) => {
        const sender = message.sender?.name || "Unknown";
        return `${sender}: ${message.content}`;
      })
      .join("\n");

    const prompt = `
You are a communication summarization assistant.

Summarize the following conversation.

Give the response in this format:

Summary:
- Main points discussed
- Important decisions
- Important information

Action Items:
- Tasks that need to be completed

Keep the summary short and easy to understand.

Conversation:
${conversation}
`;

    const response = await fetch(ENV.ollamaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma3:4b",
        prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama error: ${response.status}`);
    }

    const data = await response.json();

    return data.response;
  } catch (error) {
    console.error("Ollama error:", error);
    throw error;
  }
}
