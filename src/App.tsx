import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/shared/Navbar'
import CenteredLoader from './components/shared/CenteredLoader'
import './App.css'
import { Admin } from './pages/Admin'
import AdminRoute from './routes/AdminRoute'
import { ProtectedRoute } from './routes/ProtectedRoute'
import { Auth } from './pages/Auth'

const LazyHome = lazy(() => import('./pages/Home'));
const LazyAbout = lazy(() => import('./pages/About'));

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {!isAuthPage && <Navbar />}
      
      <div className={`${!isAuthPage ? 'container mx-auto pt-16 md:px-16 lg:px-32' : ''}`}>
        <Suspense fallback={<CenteredLoader messages={['Surffing the internet...', 'Loading the pages...']} />}>
          <Routes>
            <Route path='/auth' element={<Auth />} />
            <Route path='/' element={<ProtectedRoute><LazyHome /></ProtectedRoute>} />
            <Route path='/home' element={<ProtectedRoute><LazyHome /></ProtectedRoute>} />
            <Route path='/about' element={<LazyAbout />} />
            <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename='/proyecto-final-diri/'>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App