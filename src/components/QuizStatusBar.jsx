import React from 'react'
import { useContext, useState, useEffect} from 'react'
import { QuizContext } from '../context/QuizContext'



export const QuizStatusBar = ({currentQuestionIndex}) => {

    const {currentQuiz} = useContext(QuizContext);
    const [progressPercentage, setProgressPercentage] = useState(((currentQuestionIndex + 1) / currentQuiz.QuestionArray.length) * 100)

    //Update ProgressPercentage when currentQuestionIndex is updated
    
    useEffect(()=>{
        setProgressPercentage(((currentQuestionIndex + 1) / currentQuiz.QuestionArray.length) * 100)
    },[currentQuestionIndex])

  return (
    <div>
        <div className="progress my-3" style={{ height: "20px" }}>
            <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${progressPercentage}%` }}
                aria-valuenow={progressPercentage}
                aria-valuemin="0"
                aria-valuemax="100"
            >
                Question {currentQuestionIndex + 1} / {currentQuiz.QuestionArray.length}
            </div>
        </div>      
    </div>
  )
}
