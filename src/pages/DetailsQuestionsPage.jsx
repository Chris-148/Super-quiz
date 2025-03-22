import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export const DetailsQuestionsPage = () => {
  // initialize const for One Question and this setter
  const [question, setQuestion] = useState({});
  // initialize const for questionId from params url
  const { questionId } = useParams();

  // recover the question data from db.json-server
  useEffect(() => {
    axios
      .get(`http://localhost:4000/question/${questionId}`)
      .then((response) => setQuestion(response.data))
      .catch((error) => console.log(error));
  }, [questionId]);
  
  return (
    <>
      <div className="container border border-2 border-primary m-5 p-5">
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
        <h4 className="text-end px-3 my-5">created by : {question.userId}</h4>
        <div className="d-flex justify-content-around">
          <Link to="/questions" className="btn btn-info">Go back to all Questions</Link>
          <Link to="/question/form" className="btn btn-warning">Update</Link>
          <Link className="btn btn-danger">Delete</Link>
        </div>
      </div>
    </>
  );
};
