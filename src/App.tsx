import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import  Navbar  from './components/shared/Navbar'
import CenteredLoader from './components/shared/CenteredLoader'
import './App.css'

const LazyHome = lazy(() => import('./pages/Home'));
const LazyAbout = lazy(() => import('./pages/About'));

function App() {
  return (
    <>
      <BrowserRouter basename='/proyecto-final-diri/'>
        <Navbar />
        <div className='container mx-auto pt-16 md:px-16 lg:px-32'>
          <Suspense fallback={<CenteredLoader messages={['Surffing the internet...', 'Loading the pages...']} />}>
            <Routes>
              <Route path='/' element={<LazyHome />} />
              <Route path='/home' element={<LazyHome />} />
              <Route path='/about' element={<LazyAbout />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
