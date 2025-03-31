import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { AuthProvider } from './context/AuthContext'
import { Login } from './pages/Login'
import Navbar from './components/shared/Navbar'
import CenteredLoader from './components/shared/CenteredLoader'
import Register from './pages/Register'
import './App.css'
import { Admin } from './pages/Admin'
import AdminRoute from './routes/AdminRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'

const LazyHome = lazy(() => import('./pages/Home'));
const LazyAbout = lazy(() => import('./pages/About'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename='/proyecto-final-diri/'>
        <Navbar />
        <div className='container mx-auto pt-16 md:px-16 lg:px-32'>
          <Suspense fallback={<CenteredLoader messages={['Surffing the internet...', 'Loading the pages...']} />}>
            <Routes>
              <Route path='/' element={<ProtectedRoute><LazyHome /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/home' element={<ProtectedRoute><LazyHome /></ProtectedRoute>} />
              <Route path='/about' element={<LazyAbout />} />
              <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
