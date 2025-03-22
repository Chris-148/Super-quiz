import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { QuestionsProvider } from './context/QuestionsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QuestionsProvider>
    <Router>
      <App />
    </Router>
  </QuestionsProvider>
  </StrictMode>,
)
