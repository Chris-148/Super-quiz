import React from 'react'
import { useContext, useEffect, useState} from 'react'
import { QuizContext } from "../context/QuizContext"

export const QuizEndedPage = () => {
    const {currentQuiz} = useContext(QuizContext)
    
    
  return (
    <div>
    <div>You made it!</div>
    {/* if  */}
    <div>Your score</div>
    {console.log(currentQuiz)}
    {currentQuiz.score.map((scoreItem, index)=>{
      const userId = Object.keys(scoreItem)[0]; 
      const score = scoreItem[userId];
      return (
        <div key={index} className="d-flex flex-row p-2 justify-content-between align-items-center">
        <div className="col-6">{userId}</div>
        <div className="col-6">{score}</div>
      </div>
      )
    })}
    {/* map of the Highscores */}
    </div>
  )
}
