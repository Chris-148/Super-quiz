import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { QuestionsContext } from "../context/QuestionsContext";
import { Link } from "react-router-dom";

export const QuestionsPage = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const { questions, loading, deleteQuestion, setUpdateThisQuestion } =
    useContext(QuestionsContext);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* {Searchbar input} */}
      <div className="form-control me-sm-2" type="search" placeholder="Search">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search Term"
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
        

        {/* {Filter Database} */}
        {}
      </div>
      {/* here is the header for the questions */}
      <div className="d-flex flex-row p-3 justify-content-between align-items-center border-secondary">
        <div className="col-2">Topic</div>
        <div className="col-3">Question</div>
        <div className="col-2">Type</div>
        <div className="col-2">Difficulty</div>
        <div className="col-2"></div>
        
      </div>

      {/*Mapping of all questions  */}
      
      {questions?.filter((questions)=>questions.question.toLowerCase().includes(searchTerm.toLowerCase())).map((oneQuestion) => {
        return (
          <div
            key={oneQuestion.id}
            className="d-flex flex-row p-2 justify-content-between align-items-center border border-primary border-2"
          >
            <div className="col-2">{oneQuestion.topic}</div>
            <div className="col-3">{oneQuestion.question}</div>
            <div className="col-2">{oneQuestion.type}</div>
            <div className="col-2">{oneQuestion.difficulty}</div>
            <div className="col-3">
            <Link
              to={`/questions/details/${oneQuestion.id}`}
              className="text-info px-3"
            >
              <i className="fa-solid fa-circle-info"></i>
            </Link>
            <Link
              className="text-danger px-3"
              onClick={() => {
                deleteQuestion(oneQuestion.id);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </Link>
            <Link
              to={`/questions/form/${oneQuestion.id}`}
              className="text-warning px-3"
            >
              <i className="fa-solid fa-pen"></i>
            </Link>
          </div></div>
        );
      })}
    </>
  );
};
