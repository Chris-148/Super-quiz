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
    //We need to create a randomized array of the wrong answers and the correct answer
    const [answerArray, setAnswerArray] = useState([])
    const difficultyScores = {
        Easy: 1,
        Medium: 2,
        Hard: 3
      };
    const {findQuizById, currentQuiz, quizLoading} = useContext(QuizContext);
    const {findQuestionById, questions} = useContext(QuestionsContext)
    

    
    useEffect(()=>{
       
        if(quizLoading) {
          findQuizById(quizId)
        }
        else if(!quizLoading){
            console.log(currentQuiz.QuestionArray)
        }
    },[quizLoading]) //later update by quiz id

    //Next steps
    // 1)Show Quiz Questions 
    // 2)Allow selection of the right answer
    // 3) Show the potential score of the answer
    // 3) Check if the answer is correct on submit button
    // 4) on submissinif answer is correct add the score to the score to the data base and add userId in the beginning of the player
    
    // const thisQuestionsScore = currentQuiz ? difficultyScores[currentQuiz.difficuly] || 0 : 0
    // console.log(currentQuestion.difficulty)
    // console.log(currentQuestion.id)
    

  return (
    !quizLoading? <>
    <div>{currentQuiz.id}</div>
    // first get the quiz data by id 
    // map the questions, the answers
    </>:<div>loading</div>
  )
}
