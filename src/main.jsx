import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { QuestionsProvider } from './context/QuestionsContext.jsx'
import { QuizProvider } from './context/QuizContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QuestionsProvider>
    <QuizProvider>
      <Router>
        <App />
      </Router>
    </QuizProvider>
  </QuestionsProvider>
  </StrictMode>,
)
