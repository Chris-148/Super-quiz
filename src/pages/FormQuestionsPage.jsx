import React, { useState } from 'react'
import axios from 'axios'

export const FormQuestionsPage = () => {
  const [question, setQuestion] = useState("")
  const [topic, setTopic] = useState("")
  const [type, setType] = useState("")
  const [good_answer, setGood_answer] = useState("")
  const [other_answer, setOther_answer] = useState(["","",""])
  const [difficulty, setDifficulty] = useState("")
  const [img, setImg] = useState("")
  const [audio, setAudio] = useState("")

  async function handleCreateQuestion(event){
    event.preventDefault()
    const newQuestionToAdd = {
      //id to be added. with uuidv4??
      question,
      topic,
      type,
      good_answer,
      other_answer,
      difficulty, 
      img, 
      audio
    }
    
    try {
      const response = await axios.post("http://localhost:4000/question", newQuestionToAdd)
      alert("Question added successfully!")
      //Clear form if submission is successful
      setQuestion("")
      setTopic("")
      setType("")
      setGood_answer("")
      setOther_answer(["","",""])
      setDifficulty("")
      setImg("")
      setAudio("")
    } catch(error) {
      console.log("Here is the error:", error);
    }
  }

  // function to update the wrong answers in array
  function handleWrongAnswerChange(index, value) {
    const updatedWrongAnswers = [...other_answer]
    updatedWrongAnswers[index] = value
    setOther_answer(updatedWrongAnswers)
    console.log(other_answer)
  }
  
  return (
    <> 
  
  <form className="container mt-4" onSubmit={handleCreateQuestion}>
    <div className="row g-3">

    <div className="col-md-4">
      <label htmlFor="dropdown" className="form-label">Type:</label>
        <select className="form-select form-select-sm" id="dropdown" value={type} onChange={(event) => setType(event.target.value)}>
          <option value="Text Question">Text Question</option>
          <option value="Image Question">Image Question</option>
          <option value="Audio Question">Audio Question</option>
        </select>
      </div>


      <div className="col-md-4">
        <label htmlFor="dropdown" className="form-label">Topic:</label>
        <select className="form-select form-select-sm" id="dropdown" value={topic} onChange={(event) => setTopic(event.target.value)}>
          <option value="General Knowledge">General Knowledge</option>
          <option value="Harry Potter">Harry Potter</option>
          <option value="Computer Science">Computer Science</option>
        </select>
      </div>

      <div className="col-md-4">
      <label htmlFor="dropdown" className="form-label">Difficulty:</label>
        <select className="form-select form-select-sm" id="dropdown" value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

   </div>

  <div className="col-12">
    <label for="Question" className="form-label">Question</label>
    <textarea className="form-control" rows="4" type="text" value={question} id="Question" placeholder="Your Question" onChange={(event)=>{setQuestion(event.target.value)}} />
  </div>

  {(type === "Image Question")?
     <div className="col-12">
     <label for="ImgLink" className="form-label">Question</label>
     <input className="form-control" type="url" value={img} id="ImgLink" placeholder="URL to Image" onChange={(event)=>{setImg(event.target.value)}} />
   </div>: null
   }

{(type === "Audio Question")?
     <div className="col-12">
     <label for="AudioLink" className="form-label">Question</label>
     <input className="form-control" type="url" value={img} id="AudioLink" placeholder="URL to Audio" onChange={(event)=>{setAudio(event.target.value)}} />
   </div>: null
   }

    {/* Correct Answer Input */}
  <div className="mb-3">
        <label className="form-label">Correct Answer:</label>
        <input
          type="text"
          className="form-control"
          value={good_answer}
          onChange={(e) => setGood_answer(e.target.value)}
          required
        />
      </div>  

    <div className="mb-3">
      <label className="form-label">Wrong Answers:</label>
      {other_answer.map((wrongAnswer, index)=>{
        return(
        <input
         key={index}
         type="text"
         className="form-control mb-2"
         value={wrongAnswer}
         onChange={(e) => handleWrongAnswerChange(index, e.target.value)}
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
