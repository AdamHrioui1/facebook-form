import Routers from './components/Routers/Routers'
import './App.css';
import { DataProvider } from './GlobalseState';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Routers />
      </div>
    </DataProvider>
  );
}

export default App;
