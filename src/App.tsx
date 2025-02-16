import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { NotFound } from './pages/NotFound'
import './App.css'
import { Navbar } from './components/shared/Navbar'

function App() {
  return (
    <>
      <BrowserRouter basename='/proyecto-final-diri/'>
      <Navbar />
          <div className='container mx-auto px-4'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
      </BrowserRouter>
    </>
  )
}

export default App
