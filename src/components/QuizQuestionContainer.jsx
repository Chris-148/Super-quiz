import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";
import { QuestionsContext } from "../context/QuestionsContext";
import { useNavigate } from "react-router-dom";
import { QuizTimer } from "./QuizTimer";
import { QuizStatusBar } from "./QuizStatusBar";
import { Loading } from "./Loading";
import toast from "react-hot-toast";

export const QuizQuestionContainer = () => {
  const { quizId } = useParams();
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
    hard: 50,
  };
  const {
    findQuizById,
    currentQuiz,
    setCurrentQuiz,
    quizLoading,
    setQuizLoading,
    timeLeft,
    setTimeLeft,
    setTimeRun,
    timePerQuestion,
    updateQuizScore,
  } = useContext(QuizContext);
  const { findQuestionById, questions } = useContext(QuestionsContext);

  useEffect(() => {
    // if(!quizId) return;
    if(currentQuiz && currentQuiz.id != quizId){
      findQuizById(quizId);
    }
    if (quizLoading) {
      findQuizById(quizId);
    } else if (!quizLoading) {
      // console.log(currentQuiz.QuestionArray)
      // console.log("this is the current Quiz:", currentQuiz)
      setAnswerArray(randomizeAnswers(currentQuiz));
      setCurrentQuestion(currentQuiz.QuestionArray[currentQuestionIndex]);
    }
  }, [quizLoading, quizId, currentQuiz, currentQuestionIndex]); //later update by quiz id

  // Calculate the score for this question based on difficulty
  useEffect(() => {
    setQuestionScore(
      currentQuestion ? difficultyScores[currentQuestion.difficulty] || 0 : 0
    );
    setTimeRun(true);
  }, [currentQuestion]);

  //Randomize answer options
  function randomizeAnswers(currentQuiz) {
    const allAnswers = [
      currentQuiz.QuestionArray[currentQuestionIndex].good_answer,
      ...currentQuiz.QuestionArray[currentQuestionIndex].other_answer,
    ];
    return allAnswers.sort(() => Math.random() - 0.5);
  }

  function handleSelect(oneAnswer) {
    if (oneAnswer === currentQuestion.good_answer) {
      console.log(oneAnswer);
    }
    setSelectedAnswer(oneAnswer);
  }

  async function handleNextQuestion() {
    if (selectedAnswer === currentQuestion.good_answer) {
      setTotalScore((prevScore) => prevScore + questionScore);
      toast.success("Correct Answer!!!")
    }else{
      toast.error("WROOOOONG!!")
    }
    if (currentQuestionIndex < currentQuiz.QuestionArray.length - 1) {
      setCurrentQuestionIndex((prevQuestionIndex) => prevQuestionIndex + 1);
      setTimeLeft(timePerQuestion);
    } else {
      setQuizLoading(true);
      setTimeRun(true);
      // check score and store if needed
      // if(currentQuiz.scores.length === 0){
      //   updateQuizScore(quizId, [{
      //     [`${currentQuiz.userId}`] : totalScore
      //   }])
      // }
      //quiz.score.userid = totalScore
      nav(`/quiz/${quizId}/${totalScore}/end`);
    }
  }
  //Go to next Question, if time is up
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNextQuestion();
    }
  }, [timeLeft]);

  //Next steps
  // 1)Show Quiz Questions
  // 2)Allow selection of the right answer
  // 3) Show the potential score of the answer
  // 3) Check if the answer is correct on submit button
  // 4) on submissinif answer is correct add the score to the score to the data base and add userId in the beginning of the player

 
  return !quizLoading ? (
    <div className="container quiz-container">
      <QuizStatusBar currentQuestionIndex={currentQuestionIndex} />
      <QuizTimer handleNextQuestion={handleNextQuestion} />
      <h2 className="text-center">Your Question #{currentQuestionIndex + 1}</h2>
      {/* img and audio need to be defined later! */}
      <p className="quiz-question">{currentQuestion.question}</p>
      <p className="quiz-point">Points you can win: {questionScore}</p>
      <p className="quiz-point">Your total score: {totalScore}</p>
      {currentQuestion.img ? (
        <div className="img-container">
          <img src={currentQuestion.img} alt="" />
        </div>
      ) : null}
      {currentQuestion.audio ? (
        <div className="img-container">
          <audio controls autoPlay src={currentQuestion.audio} />
        </div>
      ) : null}
      <div className="quiz-answer-container">
        {answerArray.map((oneAnswer, index) => {
          return (
            <div key={index} className="quiz-answer">
              <div
                className={`text-center ${
                  selectedAnswer === oneAnswer ? "selected-answer" : ""
                }`}
                onClick={() => handleSelect(oneAnswer)}
                style={{ cursor: "pointer" }}
              >
                {oneAnswer}
              </div>
            </div>
          );
        })}
        <div className="quiz-btn-next">
          <button onClick={handleNextQuestion} className="btn btn-primary">
            Next Question
          </button>
        </div>
      </div>
    </div>
  ) : (
    <Loading/>
  )
};
