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

    // Always resets ScoreIsSubmitted? to false on loading the page to enable the submission of the score
    useEffect(() => {
      setScoreIsSubmitted(false);
    }, []);
    //sorts the score for a given quiz with a specific quizId to show top scores in order high to low
    const sortedQuizScores = currentQuiz.scores?.sort((a,b)=>{
      const scoreA = Object.values(a)[0];
      const scoreB = Object.values(b)[0]; 
      return scoreB-scoreA;
    })
    //cuts the sortedQuizScores to 10
    const top10Scores = sortedQuizScores?.slice(0,10);
  
  //When pressing the Play Again button
  function handlePlayAgain(){
    nav(`/quiz/${quizId}`);
    setScoreIsSubmitted(false);
  }

  
  return (
    <div className='container'>
    <h2 className='text-center'>You made it!</h2>
    {/* if  */}
    <h3 className='your-score'>Your score: {totalScore}</h3>
    <div className="input-container">
    
    <input type="text" id="Player Name" placeholder=' ' required value={playerName} onChange={(event)=>setPlayerName(event.target.value)} /><label htmlFor="Player Name" className='label'>Player Name</label>
    <div className="underline"></div>
    </div>
    <div className="text-center"> <button className='btn' disabled={scoreIsSubmitted || !playerName} onClick={()=>{handleSubmitScore(currentQuiz.id, totalScore, playerName)}}>Submit your score</button></div>
   
    {/* u can do it */}
    {/* scoreIsSubmitted is used to check if the Player has submitted his name and score */}
    {scoreIsSubmitted?(
    <div className='highscore-container'>
    <h2 className='text-center'>Top 10 Highscores</h2>
    {top10Scores?.map((scoreItem, index)=>{
      const userId = Object.keys(scoreItem)[0]; 
      const score = scoreItem[userId];
      return (
        <div key={index} className="user-score-container">
          <div className="col-4">{userId}</div>
          <div className="col-4">{score}</div>
        </div>
      )})
    }
    </div>)
    :null}
    <div className="text-center"><button onClick={handlePlayAgain} className="btn btn-success">Play Again</button></div>
    
    {/* map of the Highscores */}
    </div>
  )
}
