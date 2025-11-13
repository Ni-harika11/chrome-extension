import './App.css';
import VoiceRecorder from './components/VoiceRecorder';
import { Header } from './common/Header';
import TextInputAI from './components/TextInputAI';

function App() {
  return (
    <div className="App w-full p-4">
    <Header/>
    <VoiceRecorder/>
    <TextInputAI/>
    </div>
  );
}

export default App;
