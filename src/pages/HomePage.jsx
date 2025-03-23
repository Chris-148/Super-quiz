import React from 'react'
import axios from 'axios'
import { QuestionsContext } from '../context/QuestionsContext'
import { useContext, useState, useEffect} from 'react'
import { v4 as uuidv4 } from 'uuid'

export const HomePage = () => {

  const { addQuestion } = useContext(QuestionsContext)
  const [allQuestions, setAllQuestions] = useState([]);
  // useEffect(()=>{
  //   axios.get('https://opentdb.com/api.php?amount=50&category=18&type=multiple')
  //   .then(res => {
  //     console.log(res)
  //     // setAllQuestions(res.data)
  //     res.data.results.map((oneQuestion)=> {
  //       if (oneQuestion.type !== 'boolean'){
  //       const formattedQuestion = {
  //         id : uuidv4(),
  //         type: "Text Question",
  //         topic: oneQuestion.category,
  //         question: oneQuestion.question,
  //         good_answer: oneQuestion.correct_answer,
  //         other_answer: oneQuestion.incorrect_answers,
  //         difficulty: oneQuestion.difficulty,
  //         img: null,
  //         audio: null,
  //         userId: null
  //         }
  //       addQuestion(formattedQuestion)
  //       }
  //     })
  //   }
  //   )
  //   .catch(err =>console.log(err))
  //   console.log(allQuestions)
  // },[])


  return (
    <div>HomePage</div>
  )
}
