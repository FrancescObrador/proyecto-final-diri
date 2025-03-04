import { StrictMode, useContext } from 'react'
import { createRoot } from 'react-dom/client'
import { IntlProvider } from 'react-intl';
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { LanguageContext } from './components/Providers/LanguageContext.tsx';
import { LanguageProvider } from './components/Providers/LanguageProvider.tsx';

const Root = () => {
  const { locale, messages } = useContext(LanguageContext);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <App />
    </IntlProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <Root />
      </LanguageProvider>
    </Provider>
  </StrictMode>,
)
