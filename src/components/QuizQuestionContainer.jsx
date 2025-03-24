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
    const [selectedAnswer, setSelectedAnswer] = useState(null)

    const difficultyScores = {
        Easy: 1,
        Medium: 2,
        Hard: 3
      };
    const {findQuizById, currentQuiz, quizLoading} = useContext(QuizContext);
    const {findQuestionById, questions} = useContext(QuestionsContext)
    
    function randomizeAnswers(currentQuiz){
      const allAnswers = [(currentQuiz.QuestionArray[currentQuestionIndex].good_answer), ...(currentQuiz.QuestionArray[currentQuestionIndex].other_answer)]
      return allAnswers.sort(()=>Math.random() - 0.5)
    }
    
    useEffect(()=>{
       
        if(quizLoading) {
          findQuizById(quizId)
        }
        else if(!quizLoading){
            // console.log(currentQuiz.QuestionArray)
            console.log("this is the current Quiz:", currentQuiz)
            setAnswerArray(randomizeAnswers(currentQuiz))     
            setCurrentQuestion({...currentQuiz.QuestionArray[currentQuestionIndex]})       
        }
    },[quizLoading, currentQuiz]) //later update by quiz id

    function handleSelect(oneAnswer) {
      if (oneAnswer === currentQuestion.good_answer){
        console.log(oneAnswer)
      }
      setSelectedAnswer(oneAnswer)
    }

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
    !quizLoading?
    <div className = "container-lg">
    <div>Your Question #{currentQuestionIndex+1}</div>
    {/* img and audio need to be defined later! */}
    <div>{currentQuestion.question}</div>
    {currentQuestion.img === null?<div>{currentQuestion.img}</div>: null}
    {currentQuestion.audio === null?<div>{currentQuestion.audio}</div>: null}
    <div className="row">
    {answerArray.map((oneAnswer, index)=>{
      return(
        <div key={index} className="col-6 p-2">
          <div  className={`p-3 border text-center ${
                selectedAnswer === oneAnswer ? "bg-primary text-white" : "bg-light text-black"
              }`}
              onClick={() => handleSelect(oneAnswer)}
              style={{ cursor: "pointer" }}>
          {oneAnswer}
          </div>
        </div>
      )
    })}
    </div>
    // first get the quiz data by id 
    // map the questions, the answers
    </div>:<div>loading</div>
  )
}
