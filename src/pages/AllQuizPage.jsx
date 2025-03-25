import { useContext, useEffect } from 'react'
import { QuizContext } from '../context/QuizContext'

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
        <div className="container mt-3">
            <h2 className="text-center my-3">All Quiz</h2>
            <p className="text-center my-2">Challenge other player and try to do a better score. Good Luck & Have Fun</p>
            {
                
                allQuiz.map(quiz => {
                    return( 
                    <div className="card my-4 border-secondary" key={quiz.id}>
                        <div className="d-flex justify-content-between my-4 ">
                            <div>Topic : {quiz.topic}</div>
                            <div>Difficulty : {quiz.difficulty}</div>
                            <div>questions : {quiz.nbrQuestions}</div>
                            <div>created by : {quiz.userId}</div>
                            <div className="btn btn-success">Play</div>
                        </div>
                    </div>)
                })
            }

        </div>
    
    
    </>
    :
    <>
        <div>loading...</div>
    </>
    
  )
}
