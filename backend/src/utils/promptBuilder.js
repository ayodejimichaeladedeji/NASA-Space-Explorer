// src/utils/promptBuilder.js
export function buildGenerateFactPrompt(topics) {
  const examples = [
    {
      input: ["The Moon", "Saturn's Rings"],
      output: `[
        {
          "topic": "The Moon",
          "fact": "The Moon is slowly moving away from Earth at a rate of about 3.8 cm per year."
        },
        {
          "topic": "Saturn's Rings",
          "fact": "Saturn's magnificent rings are primarily made of billions of tiny pieces of ice, ranging from microscopic dust to house-sized boulders."
        }
      ]`,
    },
    {
      input: ["Black Holes", "Exoplanets", "Mars Rovers"],
      output: `[
        {
          "topic": "Black Holes",
          "fact": "Nothing, not even light, can escape the immense gravity of a black hole once it crosses the event horizon."
        },
        {
          "topic": "Exoplanets",
          "fact": "The first exoplanet, 51 Pegasi b, was discovered orbiting a sun-like star in 1995, forever changing our understanding of planetary systems."
        },
        {
          "topic": "Mars Rovers",
          "fact": "NASA's Mars rovers, like Curiosity and Perseverance, are essentially robotic geologists exploring the Martian surface for signs of past or present life."
        }
      ]`,
    },
  ];

  let prompt = `You are an expert at generating concise, *highly unique*, and genuinely fascinating space facts. Each fact must be no longer than 20 words.
                Your primary task is to generate exactly one *completely distinct* and *absolutely non-repetitive* interesting fact for each of the provided topics.
                Each fact should be surprising, lesser-known, or offer a new perspective.
                The output MUST be a JSON array of objects. Each object in the array MUST have two keys: "topic" (string) and "fact" (string).
                Do NOT include any introductory or concluding text, or any formatting outside the JSON array.
                It is critical that the facts for different topics are not variations of the same core information.
                Here are examples of the desired output format, illustrating distinctness:`;

  examples.forEach((example) => {
    prompt += `Topics: ${JSON.stringify(
      example.input
    )}\n Output:\n\`\`\`json\n${example.output}\n\`\`\`\n\n`;
  });

  prompt += `Topics: ${JSON.stringify(topics)}\nOutput:\n\`\`\`json\n[\n`;

  return prompt;
}
