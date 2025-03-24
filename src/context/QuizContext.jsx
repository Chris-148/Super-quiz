import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { QuestionsContext } from "./QuestionsContext";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const {findQuestionById, fetchAllQuestions} = useContext(QuestionsContext)
    const [quizLoading, setQuizLoading] = useState(true)
    const [currentQuiz, setCurrentQuiz] = useState({})
 

    async function findQuizById(QuizId){
        try {
            const res = await axios.get(`http://localhost:4000/quiz/${QuizId}`)
            setCurrentQuiz(res.data)
            setQuizLoading(false)
        } catch(err) {console.log(err)}
    }
     

    async function createQuiz(newQuiz)
    {
      try{
        const res = await axios.post(`http://localhost:4000/quiz`, newQuiz )
        return res
      }catch(err) {console.log(err)}
    }
    
    return (
      <QuizContext.Provider value={{findQuizById, currentQuiz, quizLoading, setQuizLoading, createQuiz}}>
          {children}
        </QuizContext.Provider>
      );
}
