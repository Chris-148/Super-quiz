import { useState, useContext, useEffect} from "react"
import { useParams } from "react-router-dom"
import { QuizContext } from "../context/QuizContext"
import { QuestionsContext } from "../context/QuestionsContext"
import { useNavigate } from "react-router-dom"

export const QuizQuestionContainer = () => {

    const {quizId} = useParams()
    // console.log(quizId)
    // const [quizId, setQuizId] = useState("1");
    const [questionScore, setQuestionScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState({});
    //We need to create a randomized array of the wrong answers and the correct answer
    const [answerArray, setAnswerArray] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const nav = useNavigate();

    const difficultyScores = {
        easy: 10,
        medium: 30,
        hard: 50
      };
    const {findQuizById, currentQuiz, quizLoading, setQuizLoading} = useContext(QuizContext);
    const {findQuestionById, questions} = useContext(QuestionsContext)

     useEffect(()=>{
        // if(!quizId) return;
        if(quizLoading) {
          findQuizById(quizId)
        }
        else if(!quizLoading){
            // console.log(currentQuiz.QuestionArray)
            // console.log("this is the current Quiz:", currentQuiz)
            setAnswerArray(randomizeAnswers(currentQuiz))     
            setCurrentQuestion(currentQuiz.QuestionArray[currentQuestionIndex])   
        }
    },[quizLoading, currentQuiz, currentQuestionIndex]) //later update by quiz id

    // Calculate the score for this question based on difficulty 
    useEffect(()=>{
      setQuestionScore(currentQuestion? difficultyScores[currentQuestion.difficulty] || 0 : 0)
    }, [currentQuestion])

    //Randomize answer options
    function randomizeAnswers(currentQuiz){
      const allAnswers = [(currentQuiz.QuestionArray[currentQuestionIndex].good_answer), ...(currentQuiz.QuestionArray[currentQuestionIndex].other_answer)]
      return allAnswers.sort(()=>Math.random() - 0.5)
    }
    
     function handleSelect(oneAnswer) {
      if (oneAnswer === currentQuestion.good_answer){
        console.log(oneAnswer)
      }
      setSelectedAnswer(oneAnswer)
    }

    function handleNextQuestion(){
      if(selectedAnswer === currentQuestion.good_answer){
        setTotalScore((prevScore) => prevScore + questionScore);
      }
      if (currentQuestionIndex < currentQuiz.QuestionArray.length) {
        setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
      } else {
        setQuizLoading(true)
        nav('/quizEnd')
      }
    }
    //Next steps
    // 1)Show Quiz Questions 
    // 2)Allow selection of the right answer
    // 3) Show the potential score of the answer
    // 3) Check if the answer is correct on submit button
    // 4) on submissinif answer is correct add the score to the score to the data base and add userId in the beginning of the player
    

    

  return (
    !quizLoading?
    <div className = "container-lg">
    <div>Your Question #{currentQuestionIndex+1}</div>
    {/* img and audio need to be defined later! */}
    <div>{currentQuestion.question}</div>
    <div>Points you can win: {questionScore}</div>
    <div>Your total score: {totalScore}</div>
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
    <button onClick={handleNextQuestion} className="btn btn-primary">Next Question</button>
    </div>
    </div>:<div>loading</div>
  )
}
