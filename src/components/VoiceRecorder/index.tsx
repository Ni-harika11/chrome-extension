  "use client"; 
  import React from "react"; 
  import { applyFilter, getAIAnswer, optimizeText } from "../../services/voice.services";
  import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

  const VoiceRecorder: React.FC = () => {
    const [text, setText] = React.useState("");
    const [filteredText, setFilteredText] = React.useState("");
    const [filter, setFilter] = React.useState("none");
    const [isCopied, setIsCopied] = React.useState(false);
    const [aiAnswer, setAiAnswer] = React.useState("");

    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    React.useEffect(() => {
      setText(transcript);
    }, [transcript]);

    const startListening = () => {
      SpeechRecognition.startListening({
        continuous: true,
        language: "en-IN",
        interimResults: true,
      });
    };

    const stopListening = () => SpeechRecognition.stopListening();

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(filteredText || text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    };

    const handleFilter = async () => {
      if (filter === "none") {
        setFilteredText(text);
        return;
      }

      try {
        const res=await applyFilter(text,filter) 
        setFilteredText(res|| text);
      } catch (error) {
        console.error("Error applying filter:", error);
      }
    };

    const handleAnswer = async () => {
      try { 
        const optimizetext= await optimizeText(text,1000)
        const answer = await getAIAnswer(optimizetext)
        
        setAiAnswer(answer);
        speakAnswer(answer); 
      } catch (error) {
        console.error("Error getting AI answer:", error);
      }
    };

    //   Function to make the AI talk
    const speakAnswer = (text: string) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-IN";
      utterance.pitch = 1;
      utterance.rate = 1;
      speechSynthesis.speak(utterance);
    };

    const handleReset =()=>{
      setAiAnswer("")
      setFilter("")
      setFilteredText("")
      setText('')
    
    }

    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn’t support speech recognition 😢</span>;
    }

    return (
      <div className="container flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">🎙️ Voice Assistant</h2>
          <div className="main-content relative bg-white p-4 rounded-lg shadow-md w-3/4 h-48 overflow-y-auto mb-6">
            <strong>🗣 You said:</strong> {text || "Speak something..."}

            {aiAnswer && (
              <div className="mt-4 text-green-700">
                <strong>🤖 AI Answer:</strong> {aiAnswer}
              </div>
            )}

            <button
              onClick={handleReset}
              className="absolute bottom-2 right-2 bg-gray-500 hover:bg-gray-600 text-white text-sm px-3 py-1 rounded-lg shadow transition"
            >
              🔄
            </button>
          </div>

        <div className="flex items-center space-x-3 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="none">No Filter</option>
            <option value="summary">Summarize</option>
            <option value="humanize">Humanize</option>
            <option value="shorten">Shorten</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition"
          >
            Apply Filter
          </button>

          <button
            onClick={handleAnswer}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition"
          >
            💬 Get AI Answer
          </button>
        </div>

        <div className="btn-style flex space-x-4">
          <button
            onClick={handleCopy}
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
