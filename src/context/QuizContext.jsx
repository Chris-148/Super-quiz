import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { QuestionsContext } from "./QuestionsContext";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const {findQuestionById, fetchAllQuestions} = useContext(QuestionsContext)
    const [quizLoading, setQuizLoading] = useState(true)
    const [currentQuiz, setCurrentQuiz] = useState({})
       //Set time per question in quiz, e.g. to 60 seconds
    const [timePerQuestion, setTimePerQuestion] = useState(10000);
    const [timeLeft, setTimeLeft] = useState(timePerQuestion);
    const [timeRun, setTimeRun] = useState(false);
 

    async function findQuizById(quizId){
        try {
            const res = await axios.get(`http://localhost:4000/quiz/${quizId}`)
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
    
    async function updateQuizScore(quizId, score)
    {
      try{
        const res = await axios.patch(`http://localhost:4000/quiz/${quizId}`, {"score" : score})
        return res

      }catch(err) {console.log(err)}
    }
    
    return (
      <QuizContext.Provider value={{findQuizById, currentQuiz, setCurrentQuiz, quizLoading, setQuizLoading, createQuiz, timePerQuestion, setTimePerQuestion, setTimeLeft,timeLeft , timeRun, setTimeRun, updateQuizScore}}>
          {children}
        </QuizContext.Provider>
      );
}
