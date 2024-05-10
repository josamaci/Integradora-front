import { Route, Routes } from 'react-router-dom';
import './App.css'
import Admin from './pages/AdminPage';
import Game from './pages/GamePage';
import WaitingPage from './pages/WaitingPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Admin />} />
      <Route path='/lobby/:room_id' element={<WaitingPage />} />
      <Route path='/caballos' element={<Game />} />
    </Routes>
  )
}

export default App
