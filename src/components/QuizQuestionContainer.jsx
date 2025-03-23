import { useState, useContext, useEffect} from "react"
import { useParams } from "react-router-dom"
import { QuizContext } from "../context/QuizContext"
import { QuestionsContext } from "../context/QuestionsContext"

export const QuizQuestionContainer = () => {

    // const {quizId} = useParams()
    const [quizId, setQuizId] = useState("1");
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState({})
    const difficultyScores = {
        Easy: 1,
        Medium: 2,
        Hard: 3
      };
    const {findQuizById, currentQuiz, quizLoading} = useContext(QuizContext);
    const {findQuestionById} = useContext(QuestionsContext)
    

    // const foundQuiz = findQuizById(quizId)
    useEffect(()=>{
         // const response = findQuizById(quizId)
        if(quizLoading) {
        findQuizById(quizId)
        // console.log(quizLoading, currentQuiz)
        }
        if(!quizLoading){
          console.log(currentQuiz)
          setCurrentQuestion(findQuestionById(currentQuiz.QuestionIdArray[currentQuestionIndex]))
          console.log(currentQuiz.QuestionIdArray[currentQuestionIndex])
        }
    },[quizLoading]) //later update by quiz id
    
    // const thisQuestionsScore = currentQuiz ? difficultyScores[currentQuiz.difficuly] || 0 : 0
    // console.log(currentQuestion.difficulty)
    // console.log(currentQuestion.id)
    

  return (
    !quizLoading? <>
    <div>{currentQuiz.id}</div>
    <div>{currentQuiz.QuestionIdArray[currentQuestionIndex]}</div>
    // first get the quiz data by id 
    // map the questions, the answers
    </>:<div>loading</div>
  )
}
