import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

//   Apply a text filter
export const applyFilter = async (text: string, filter: string): Promise<string> => {
  const res = await axios.post<{ output: string }>(`${API_BASE_URL}/filter`, { text, filter });
  return res.data.output || text;
};

//   Get AI-generated answer
export const getAIAnswer = async (text: string): Promise<string> => {
  const res = await axios.post<{ output: string }>(`${API_BASE_URL}/answer`, { text });
  return res.data.output;
};

export const optimizeText = async (text: string, maxLength: number) => {
  // 1️⃣ Trim extra spaces
  const trimmed = text.trim();
  console.log(trimmed, "timed data");

  // 2️⃣ Clean up filler words and extra spaces
  let cleaned = trimmed
    .replace(/\s+/g, " ") // multiple spaces -> one space
    .replace(/\bum\b|\blike\b|\byou know\b/gi, ""); // remove filler words

  // 3️⃣ Remove consecutive repeated single words (e.g., "hi hi hi" → "hi")
  cleaned = cleaned.replace(/\b(\w+)( \1\b)+/gi, "$1");

  // 4️⃣ Remove repeated short phrases (e.g., "how are you how are you" → "how are you")
  cleaned = cleaned.replace(/\b(\w+\s+\w+)( \1\b)+/gi, "$1");

  // 5️⃣ Trim again and limit length
  cleaned = cleaned.trim();
  console.log(cleaned, "clead daat");

  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned;
};


export {};
