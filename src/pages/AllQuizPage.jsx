import { useContext, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'
import {Link} from "react-router-dom"
import { Loading } from '../components/Loading'

export const AllQuizPage = () => {
    const {allQuiz, allQuizLoading, findAllQuiz} = useContext(QuizContext)
    useEffect(()=> {
        if(allQuizLoading)
        {
            findAllQuiz()
        }else{
            
        }
    },[allQuizLoading])
  return (
    !allQuizLoading?
    <>
        
            <h2 className="text-center">All Quiz</h2>
            <p className="text-center p-all-quiz">Challenge other player and try to do a better score. Good Luck & Have Fun</p>
            {
                
                allQuiz.map(quiz => {
                    return( 
                    <div className="tab-container tab-content" key={quiz.id}>
                        
                            <div className='col-2'>Topic : {quiz.topic ? quiz.topic : "All Topic"}</div>
                            <div className='col-2'>Difficulty : {quiz.difficulty? quiz.difficulty : "All Difficulty"}</div>
                            <div className='col-2'>questions : {quiz.nbrQuestions}</div>
                            <div className='col-2'>created by : {quiz.userId}</div>
                            <Link to={`/quiz/${quiz.id}`} className="btn btn-success text-center 'col-2'">Play</Link>
                        
                    </div>)
                })
            }

        
    
    
    </>
    :
    <>
        <Loading/>
    </>
    
  )
}
