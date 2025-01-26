import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import StudentsPage from './components/StudentsPage/StudentsPage';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/students" element={<StudentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
