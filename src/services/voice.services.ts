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

export {};
