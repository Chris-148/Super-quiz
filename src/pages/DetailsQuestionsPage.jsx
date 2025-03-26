
import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { QuestionsContext } from "../context/QuestionsContext";

export const DetailsQuestionsPage = () => {

  // take all questions from contexte and the function to find the question with this id
  const { loading, findQuestionById, deleteQuestion } = useContext(QuestionsContext);

  // initialize const for questionId from params url
  const { questionId } = useParams();

  // initialize question
  const  [question, setQuestion] = useState({});

  // initialize navigate
  let nav = useNavigate()

  // recover the question data from db.json-server
  useEffect(() => {
    
    if(!loading){

      setQuestion(findQuestionById(questionId));
    }
  }, [loading, questionId]);
  if(!question){
    nav('/questions')
  }
  return (
    <>
    
      <div className="container border border-2 border-primary m-5 p-5">
        {question.img ? <img src={question.img} /> : ""}
        <h2 className="text-center py-5 text-secondary">{question.question}</h2>
        <h3 className="px-3">Answer : </h3>
        <ul className="mx-3">
          <li className="text-success">{question.good_answer}</li>
          {

          //  array?.map == optional chaining . so do the map only if array is undefined
          // this is like question.other_answer && question.other_answer.map()
                question.other_answer?.map((answer, index) => (
              <li key={index} className="text-danger">{answer}</li>
            ))

          }
        </ul>
        <h3 className="px-3">Difficulty : {question.difficulty}</h3>
        <h4 className="text-end px-3 my-5">created by : {question.userId}</h4>
        <div className="d-flex justify-content-around">
          <Link to="/questions" className="btn btn-info">Go back to all Questions</Link>
          <Link to={`/questions/form/${question.id}`} className="btn btn-warning">Update</Link>
          <button className="btn btn-danger" onClick={()=> {
            deleteQuestion(question.id);
            nav('/questions');
          }}>Delete</button>
        </div>
      </div>
    </>
  );
};
