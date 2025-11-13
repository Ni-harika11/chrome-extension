"use client";

import React, { useState } from "react";
import { getAIAnswer, optimizeText } from "../../services/voice.services";

const TextInputAI: React.FC = () => {
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // 🔹 Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setUserInput(content);
    };
    reader.readAsText(selectedFile);
  };

  // 🔹 Handle AI query (for file or text)
  const handleAskAI = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setAiResponse("");

    try {
      const optimized = await optimizeText(userInput, 1000);
      const answer = await getAIAnswer(optimized);
      setAiResponse(answer);
      speakAnswer(answer);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setAiResponse("⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle only text input (ignore file)
  const handleTextOnlyAI = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    setAiResponse("");
    setFile(null); // ignore file

    try {
      const optimized = await optimizeText(userInput, 1000);
      const answer = await getAIAnswer(optimized);
      setAiResponse(answer);
      speakAnswer(answer);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setAiResponse("⚠️ Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Clear input and response
  const handleClear = () => {
    setUserInput("");
    setAiResponse("");
    setFile(null);
  };

  // 🔹 Speak AI answer
  const speakAnswer = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-IN";
    utterance.pitch = 1;
    utterance.rate = 1;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">🧠 Text & File AI Assistant</h2>

      <div className="bg-white shadow-md rounded-lg w-3/4 p-6 mb-4">
        {/* 📁 File Upload Section */}
        <div className="mb-3">
          <label className="font-semibold block mb-2">Upload a File:</label>
          <input
            type="file"
            accept=".txt,.md,.doc,.docx,.pdf"
            onChange={handleFileUpload}
            className="block w-full border border-gray-300 p-2 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          />
          {file && (
            <p className="text-sm text-gray-500 mt-1">
              📄 {file.name} uploaded successfully!
            </p>
          )}
        </div>

        {/* ✍️ Text Input Section */}
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type or upload content here..."
          className="w-full h-32 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none resize-none"
        />

        {/* 🔘 Buttons */}
        <div className="flex flex-wrap space-x-3 mt-4">
          <button
            onClick={handleAskAI}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
            } transition`}
          >
            {loading ? "Thinking..." : "Ask AI (File/Text) 🤖"}
          </button>

          <button
            onClick={handleTextOnlyAI}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } transition`}
          >
            {loading ? "Thinking..." : "Ask AI (Text Only) 💬"}
          </button>

          <button
            onClick={handleClear}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      {/* 🧠 AI Response Section */}
      {aiResponse && (
        <div className="bg-green-50 border border-green-300 text-green-800 w-3/4 p-4 rounded-lg shadow-inner">
          <strong>🤖 AI Answer:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
};

export default TextInputAI;
