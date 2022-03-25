import './App.css';
import Sighting from './components/Sighting';
import PhotoCard from './components/PhotoCard';

function App() {
  return (
    <div className="App">
      <h1>🐯🐟🐧Endangered Animals Sighting Tracker🐧🐟🐯</h1>
      <PhotoCard />
      <Sighting />
    </div>
  );
}

export default App;
