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

export const optimizeText = async (text:string,maxLength:number)=>{
  console.log(text.length);
  
  const trimed=text.trim();
  console.log(trimed.length,"timed data");
  
  const cleaned = trimed.replace(/\s+/g, " ").replace(/\bum\b|\blike\b|\byou know\b/gi, "");
  console.log(cleaned,"clead daat");
  
  return cleaned.length > maxLength ? cleaned.slice(0,maxLength) : cleaned
}

export {};
