import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { HashRouter } from 'react-router-dom'

const Root = () => {
  return (
    <Provider store={store}>
      <HashRouter>

      <App/>  
      </HashRouter>
    </Provider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
