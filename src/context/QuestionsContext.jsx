import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to have all questions
  async function fetchAllQuestions() {
    try {
      const response = await axios.get("http://localhost:4000/question");
      setQuestions(response.data);
      setLoading(false);
    //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //function to find one question by id
  function findQuestionById(id) {
    return questions.find((question) => question.id == id);
  }

  async function deleteQuestion(id){
    try{
        await axios.delete(`http://localhost:4000/question/${id}`)
        // use latest version of the variable questions with prevQuestions to be sure to have all previous change
        setQuestions((prevQuestions) => prevQuestions.filter((q) => q.id != id));
    }catch(error)
    {
        console.log(error)
    }
  }

  //   we call the server just one time to take all questions
  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <QuestionsContext.Provider value={{ questions, findQuestionById, deleteQuestion , loading}}>
      {children}
    </QuestionsContext.Provider>
  );
};
