import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'

function App() {

  return (
    <Routes>
      <Route path='' element={<Home/>} />
      <Route path='home' element={<Home/>} />
      <Route path='about' element={<About/>} />
      <Route path='*' element={<NotFound/>} />
    </Routes>
  )
}

export default App
