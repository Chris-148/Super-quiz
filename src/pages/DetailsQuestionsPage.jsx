
import { useEffect, useContext, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { QuestionsContext } from "../context/QuestionsContext";
import toast from "react-hot-toast";

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
  // if(!question){
  //   nav('/questions')
  // }
  return (
    <>
    
      <div className="details-container">
        {question.img ? <div className="img-container"><img src={question.img} /></div> : ""}
        {question.audio ? <audio controls src={question.audio}/> : "" }
        <h2 className="text-center">{question.question}</h2>
        <h3 className="details-h3">Answer : </h3>
        <ul className="">
          <li className="text-success">{question.good_answer}</li>
          {

          //  array?.map == optional chaining . so do the map only if array is undefined
          // this is like question.other_answer && question.other_answer.map()
                question.other_answer?.map((answer, index) => (
              <li key={index} className="text-danger">{answer}</li>
            ))

          }
        </ul>
        <h3 className="details-h3">Difficulty : {question.difficulty}</h3>
        <h4 className="details-h4">created by : {question.userId}</h4>
        <div className="details-tools-container">
          <Link to="/questions" className="btn text-light">Go back to all Questions</Link>
          <Link to={`/questions/form/${question.id}`} className="btn text-center text-warning"><i className="fa-solid fa-pen"></i></Link>
          <Link to="/questions" className="btn text-danger text-center" onClick={()=> {
            deleteQuestion(question.id);
            toast.success('Question deleted');
            
          }}><i className="fa-solid fa-trash"></i></Link>
        </div>
      </div>
    </>
  );
};
