import React from 'react'
import { useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { QuizContext } from "../context/QuizContext"
import { useNavigate } from 'react-router-dom'
import { QuestionsContext } from '../context/QuestionsContext'

export const QuizEndedPage = () => {
    const {currentQuiz, handleSubmitScore, scoreIsSubmitted, setScoreIsSubmitted} = useContext(QuizContext);
    const {setCurrentQuestionIndex} = useContext(QuestionsContext);
    const {totalScore} = useParams();
    const [playerName, setPlayerName] = useState("")
    const nav = useNavigate()
    const {quizId} = useParams();


    
    const sortedQuizScores = currentQuiz.scores?.sort((a,b)=>{
      const scoreA = Object.values(a)[0];
      const scoreB = Object.values(b)[0]; 
      return scoreB-scoreA;
    })

    const top10Scores = sortedQuizScores?.slice(0,10);
  
  function handlePlayAgain(){
    nav(`/quiz/${quizId}`);
    setScoreIsSubmitted(false);
  }

  
  return (
    <div>
    <div>You made it!</div>
    {/* if  */}
    <div>Your score</div>
    <label htmlFor="Player Name">Player Name</label>
    <input type="text" id="Player Name" value={playerName} onChange={(event)=>setPlayerName(event.target.value)} />
    <button disabled={scoreIsSubmitted} onClick={()=>{handleSubmitScore(currentQuiz.id, totalScore, playerName)}}>Submit your score</button>
    {/* u can do it */}
    {/* scoreIsSubmitted is used to check if the Player has submitted his name and score */}
    {scoreIsSubmitted? top10Scores?.map((scoreItem, index)=>{
      const userId = Object.keys(scoreItem)[0]; 
      const score = scoreItem[userId];
      return (
        <div key={index} className="d-flex flex-row p-2 justify-content-between align-items-center">
        <div className="col-4">{userId}</div>
        <div className="col-4">{score}</div>
      </div>
      )
    }):null}
    <button onClick={handlePlayAgain} className="col-4">Play Again</button>
    {/* map of the Highscores */}
    </div>
  )
}
