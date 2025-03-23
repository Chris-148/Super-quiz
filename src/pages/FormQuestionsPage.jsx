import React, { useState, useContext } from 'react'
import axios from 'axios'
import { QuestionsContext } from '../context/QuestionsContext'

export const FormQuestionsPage = () => {
  const {addQuestion} = useContext(QuestionsContext)
  const [newQuestionToAdd, setNewQuestionToAdd] = useState({
    question: "",
    topic: "",
    type: "",
    good_answer: "",
    other_answer: ["","",""],
    difficulty: "Easy",
    img: "",
    audio: ""
  })

  function handleCreateQuestion(event){
    event.preventDefault()
    addQuestion(newQuestionToAdd)
    setNewQuestionToAdd({
            question: "",
            topic: "",
            type: "",
            good_answer: "",
            other_answer: ["","",""],
            difficulty: "Easy",
            img: "",
            audio: ""
          })
   
  }

  // function to update the wrong answers in array
  // function handleWrongAnswerChange(index, value) {
  //   const updatedWrongAnswers = [...newQuestionToAdd.other_answer]
  //   updatedWrongAnswers[index] = value
  //   setNewQuestionToAdd({...newQuestionToAdd, ["other_answer"] : updatedWrongAnswers})
  //   console.log(newQuestionToAdd.other_answer)
  // }
  function handleOnChange(e, index=null)
  {
    const name= e.target.name;
    const value= e.target.value;
    if(index === null){
      setNewQuestionToAdd({...newQuestionToAdd, [name] : value})
    }else{
    const updatedWrongAnswers = [...newQuestionToAdd.other_answer]
    updatedWrongAnswers[index] = value
    setNewQuestionToAdd({...newQuestionToAdd, ["other_answer"] : updatedWrongAnswers})
    }
    
    
  }
  
  return (
    <> 
  
  <form className="container mt-4" onSubmit={handleCreateQuestion}>
    <div className="row g-3">

    <div className="col-md-4">
      <label htmlFor="dropdown" className="form-label">Type:</label>
        <select className="form-select form-select-sm" id="dropdown" name="type" value={newQuestionToAdd.type} onChange={handleOnChange}>
          <option value="Text Question">Text Question</option>
          <option value="Image Question">Image Question</option>
          <option value="Audio Question">Audio Question</option>
        </select>
      </div>


      <div className="col-md-4">
        <label htmlFor="dropdown1" className="form-label">Topic:</label>
        <select className="form-select form-select-sm" id="dropdown1" name="topic" value={newQuestionToAdd.topic} onChange={handleOnChange}>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Harry Potter">Harry Potter</option>
          <option value="Computer Science">Computer Science</option>
        </select>
      </div>

      <div className="col-md-4">
      <label htmlFor="dropdown" className="form-label">Difficulty:</label>
        <select className="form-select form-select-sm" id="dropdown" name="difficulty" value={newQuestionToAdd.difficulty} onChange={handleOnChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

   </div>

  <div className="col-12">
    <label htmlFor="Question" className="form-label">Question</label>
    <textarea className="form-control" rows="4" type="text" name="question" value={newQuestionToAdd.question} id="Question" placeholder="Your Question" onChange={handleOnChange} />
  </div>

  {(newQuestionToAdd.type === "Image Question")?
     <div className="col-12">
     <label htmlFor="ImgLink" className="form-label">Question</label>
     <input className="form-control" type="url" value={newQuestionToAdd.img} name="img" id="ImgLink" placeholder="URL to Image" onChange={handleOnChange} />
   </div>: null
   }

{(newQuestionToAdd.type === "Audio Question")?
     <div className="col-12">
     <label htmlFor="AudioLink" className="form-label">Question</label>
     <input className="form-control" type="url" value={newQuestionToAdd.audio} name="audio" id="AudioLink" placeholder="URL to Audio" onChange={handleOnChange} />
   </div>: null
   }

    {/* Correct Answer Input */}
  <div className="mb-3">
        <label className="form-label">Correct Answer:</label>
        <input
          type="text"
          name='good_answer'
          className="form-control"
          value={newQuestionToAdd.good_answer}
          onChange={handleOnChange}
          required
        />
      </div>  

    <div className="mb-3">
      <label className="form-label">Wrong Answers:</label>
      {
      
      newQuestionToAdd.other_answer.map((wrongAnswer, index)=>{
        
        return(
        <input
         key={index}
         type="text"
         className="form-control mb-2"
         name="other_answer"
         value={wrongAnswer}
         onChange={(e) => handleOnChange(e, index)}
         placeholder={`Wrong Answer ${index + 1}`}
         required 
       />
        )
      })}
    </div>
    
 
      <button className="btn btn-primary">Submit</button>
    </form>
    </>
  )
}
