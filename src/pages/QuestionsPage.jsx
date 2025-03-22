import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const QuestionsPage = () => {

const [allQuestions, setAllQuestions] = useState ([])
const [searchTerm, setSearchTerm] = useState("")

// API pull to get all questions
useEffect(()=>{
  async function getAllQuestions() {
    try {
      const response = await axios.get(`http://localhost:4000/question`)
      console.log(response)
      setAllQuestions(response.data)
    } catch (err) {
      console.log(`here is the error ${err}`)
    }
  }
  
  getAllQuestions()
},[])

  return (
    <>
    {/* {Searchbar input} */}
    <div>
      <input 
      type="text" 
      value={searchTerm} 
      placeholder="Search Term" 
      onChange={(event)=>{
        setSearchTerm(event.target.value)}}     
      />

    {/* {Filter Database} */}
    {}

    </div>
    {/* here is the header for the questions */}
    <div className="d-flex flex-row p-2 justify-content-between align-items-center border-secondary">
      <div>Topic</div>
      <div>Question</div>
      <div>Type</div>
      <div>Difficulty</div>
      <div></div>
      <div></div>
    </div>
   

    {/*Mapping of all questions  */}
    {allQuestions.map((oneQuestion)=>{
      return(
    <div key = {oneQuestion.id} className="d-flex flex-row p-2 justify-content-between align-items-center border border-primary border-2">
      <div>{oneQuestion.topic}</div>
      <div>{oneQuestion.question}</div>
      <div>{oneQuestion.type}</div>
      <div>{oneQuestion.difficulty}</div>
      <button className="btn btn-primary btn-lg">Delete</button>
      <button className="btn btn-primary btn-lg">Update</button>  
    </div>
      )
    })}
    </>
  )
}
