import './App.css';
import VoiceRecorder from './components/VoiceRecorder';
import { Header } from './common/Header';

function App() {
  return (
    <div className="App w-full p-4">
    <Header/>
    <VoiceRecorder/>
    </div>
  );
}

export default App;
