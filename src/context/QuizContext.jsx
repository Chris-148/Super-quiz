import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {

    const [quizLoading, setQuizLoading] = useState(true)
    const [currentQuiz, setCurrentQuiz] = useState({})

    async function findQuizById(QuizId){
        try {
            const res = await axios.get(`http://localhost:4000/quiz/${QuizId}`)
            setCurrentQuiz(res.data)
            setQuizLoading(false)
        } catch(err) {console.log(err)}
    }

     return (
        <QuizContext.Provider value={{findQuizById, currentQuiz, quizLoading}}>
          {children}
        </QuizContext.Provider>
      );

}
