"use client";


import useClipboard from 'react-use-clipboard'; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React from 'react';

const VoiceRecorder: React.FC = () => {
  const [text, setText] = React.useState('');  
  const [isCopied, setCopied] = useClipboard(text);  

  const startListening = () =>
    console.log("I am listning ",text);
    
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN', interimResults: true });

  const stopListening = () => SpeechRecognition.stopListening();

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  React.useEffect(() => {
    setText(transcript); 
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn’t support speech recognition 😢</span>;
  }

  return (
    <div className="container flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h2 className="text-2xl font-bold mb-4">🎙️ Speech to Text Converter</h2>

      <div className="main-content bg-white p-4 rounded-lg shadow-md w-3/4 h-48 overflow-y-auto mb-6">
        {text || transcript || "Speak something..."}
      </div>

      <div className="btn-style flex space-x-4">
        <button
          onClick={setCopied}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          {isCopied ? "✅ Copied!" : "📋 Copy Text"}
        </button>
        <button
          onClick={startListening}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
        >
          ▶️ Start Listening
        </button>
        <button
          onClick={stopListening}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
};

export default VoiceRecorder;
