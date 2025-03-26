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
    const [allQuiz, setAllQuiz] = useState([])
    const [allQuizLoading, setAllQuizLoading] = useState(true)
    const [scoreIsSubmitted,setScoreIsSubmitted] = useState("false");

 
    async function findAllQuiz(){
      try{
        const res= await axios.get("http://localhost:4000/quiz")
        setAllQuiz(res.data)
        setAllQuizLoading(false)
      }catch(err){console.log(err)}
    }


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
        const res = await axios.patch(`http://localhost:4000/quiz/${quizId}`, {"scores" : score})
        setCurrentQuiz(res.data)
        return res

      }catch(err) {console.log(err)}
    }

    async function handleSubmitScore(quizId, score, playerName){
      try{
        const allScores = [...currentQuiz.scores, {[playerName]:score}]
        console.log(playerName, allScores[0], quizId)
        updateQuizScore(quizId, allScores)
        setScoreIsSubmitted(true)
      } catch(err) {console.log(err)}
    }
    
    return (
      <QuizContext.Provider value={{findQuizById, currentQuiz, setCurrentQuiz, quizLoading, setQuizLoading, createQuiz, findAllQuiz, allQuizLoading, allQuiz, timePerQuestion, setTimePerQuestion, setTimeLeft,timeLeft , timeRun, setTimeRun, updateQuizScore, handleSubmitScore, setScoreIsSubmitted, scoreIsSubmitted}}>
          {children}
        </QuizContext.Provider>
      );
}
