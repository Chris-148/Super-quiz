import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { QuestionsContext } from "../context/QuestionsContext";
import { useParams } from "react-router-dom";

export const FormQuestionsPage = () => {
  const {
    addQuestion,
    findQuestionById,
    loading,
    updateQuestion,
    questionsTopic,
  } = useContext(QuestionsContext);
  const [newQuestionToAdd, setNewQuestionToAdd] = useState({
    question: "",
    topic: "",
    type: "",
    good_answer: "",
    other_answer: ["", "", ""],
    difficulty: "Easy",
    img: "",
    audio: "",
  });

  // initailize params
  const { questionId } = useParams();

  useEffect(() => {
    // if we have id params and all questions are load insade question state (need this because find works with question state)
    if (!loading && questionId) {
      const updateQuestion = findQuestionById(questionId);
      // console.log(findQuestionById(questionId))
      setNewQuestionToAdd(updateQuestion);
    }
  }, [loading, questionId]);

  function handleCreateQuestion(event) {
    event.preventDefault();
    if (questionId) {
      updateQuestion(newQuestionToAdd);
      //  console.log(newQuestionToAdd)
    } else {
      addQuestion(newQuestionToAdd);
    }

    setNewQuestionToAdd({
      question: "",
      topic: "",
      type: "",
      good_answer: "",
      other_answer: ["", "", ""],
      difficulty: "Easy",
      img: "",
      audio: "",
    });
  }

  // function to update the wrong answers in array
  // function handleWrongAnswerChange(index, value) {
  //   const updatedWrongAnswers = [...newQuestionToAdd.other_answer]
  //   updatedWrongAnswers[index] = value
  //   setNewQuestionToAdd({...newQuestionToAdd, ["other_answer"] : updatedWrongAnswers})
  //   console.log(newQuestionToAdd.other_answer)
  // }
  function handleOnChange(e, index = null) {
    const name = e.target.name;
    const value = e.target.value;
    if (index === null) {
      setNewQuestionToAdd({ ...newQuestionToAdd, [name]: value });
    } else {
      const updatedWrongAnswers = [...newQuestionToAdd.other_answer];
      updatedWrongAnswers[index] = value;
      setNewQuestionToAdd({
        ...newQuestionToAdd,
        ["other_answer"]: updatedWrongAnswers,
      });
    }
  }

  return (
    <>
      <form className="questions-form" onSubmit={handleCreateQuestion}>
        
          <div className="group-form-container">
            <div className="select-container">
              <label htmlFor="dropdown" className="form-label">
                Type:
              </label>
              <select
                className="form-select form-select-sm"
                id="dropdown"
                name="type"
                value={newQuestionToAdd.type}
                onChange={handleOnChange}
              >
                <option value="Text Question">Text Question</option>
                <option value="Image Question">Image Question</option>
                <option value="Audio Question">Audio Question</option>
              </select>
            </div>

            <div className="select-container">
              <label htmlFor="dropdown1" className="form-label">
                Topic:
              </label>
              <select
                className="form-select form-select-sm"
                id="dropdown1"
                name="topic"
                value={newQuestionToAdd.topic}
                onChange={handleOnChange}
              >
                {questionsTopic.map((topic, index) => {
                  return (
                    <option key={index} value={topic}>
                      {topic}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="select-container">
              <label htmlFor="dropdown" className="form-label">
                Difficulty:
              </label>
              <select
                className="form-select form-select-sm"
                id="dropdown"
                name="difficulty"
                value={newQuestionToAdd.difficulty}
                onChange={handleOnChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        

        <div className="input-container">
          
          <textarea
            className="form-control"
            rows="4"
            type="text"
            name="question"
            value={newQuestionToAdd.question}
            
            id="Question"
            placeholder=" "
            required
            onChange={handleOnChange}
          /><label htmlFor="Question" className="label">
           Your Question
          </label>
          <div className="underline"></div>
        </div>

        {newQuestionToAdd.type === "Image Question" ? (
          <div className="input-container">
            <label htmlFor="ImgLink" className="form-label">
              Question
            </label>
            <input
              className="form-control"
              type="url"
              value={newQuestionToAdd.img}
              name="img"
              id="ImgLink"
              placeholder="URL to Image"
              onChange={handleOnChange}
            />
          </div>
        ) : null}

        {newQuestionToAdd.type === "Audio Question" ? (
          <div className="input-container">
            <label htmlFor="AudioLink" >
              Question
            </label>
            <input
              className="form-control"
              type="url"
              value={newQuestionToAdd.audio}
              name="audio"
              id="AudioLink"
              placeholder="URL to Audio"
              onChange={handleOnChange}
            />
          </div>
        ) : null}

        {/* Correct Answer Input */}
        <div className="input-container">
          
          <input
            type="text"
            name="good_answer"
            className="form-control"
            value={newQuestionToAdd.good_answer}
            onChange={handleOnChange}
            placeholder=" "
            required=" "
          /><label className="label">Correct Answer:</label>
          <div className="underline"></div>
        </div>

        <div className="input-container">
          <label>Wrong Answers:</label>
          {newQuestionToAdd.other_answer.map((wrongAnswer, index) => {
            return (
              <div key={index} className="question-form-wrong">
              <input
                
                type="text"
                className="form-control mb-2"
                name="other_answer"
                value={wrongAnswer}
                onChange={(e) => handleOnChange(e, index)}
                placeholder={`Wrong Answer ${index + 1}`}
                required
              />
              <div className="underline"></div>
              </div>
            );
          })}
        </div>
          <div className="question-form-btn"><button className="btn btn-primary">Submit</button></div>
       
      </form> 
    </>
  );
};
