import { useState } from 'react'
import './App.css'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { QuizPage } from './pages/QuizPage'
import { QuestionsPage } from './pages/QuestionsPage'
import { FormQuestionsPage } from './pages/FormQuestionsPage'
import { DetailsQuestionsPage } from './pages/DetailsQuestionsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { Footer } from './components/Footer'
import { AboutPage } from './pages/AboutPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <div className="container-fluid">

      {/* ROUTER */}
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/quiz' element={<QuizPage/>}/>
        <Route path='/questions' element={<QuestionsPage/>}/>
        <Route path='/questions/form' element={<FormQuestionsPage/>}/>
        <Route path="/questions/details/:questionId" element={<DetailsQuestionsPage/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
     </div>
     <Footer/>
    </>
  )
}

export default App
