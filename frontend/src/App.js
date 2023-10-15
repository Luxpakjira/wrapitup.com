import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

function App() {

  return (
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    
  );
}

export default App;
