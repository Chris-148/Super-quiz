import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [updateThisQuestion, setUpdateThisQuestion] = useState(null)

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
  
  // add question function
  async function addQuestion(question)
  {
    try {
      const response = await axios.post("http://localhost:4000/question", question)
      alert("Question added successfully!")
      // to add the new question insade the array state Questions 
      setQuestions((prevQuestions) => [...prevQuestions, response.data]);
      
    } catch(error) {
      console.log("Here is the error:", error);
    }
  }

// update question function
async function updateQuestion(question)
{
  try {
    const response = await axios.put(`http://localhost:4000/question/${question.id}`, question)
    alert("Question update successfully!")
    // to update the new question insade the array state Questions 
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q.id == question.id ? response.data : q))
    );

  } catch(error) {
    console.log("Here is the error:", error);
  }
}


  //   we call the server just one time to take all questions
  useEffect(() => {
    fetchAllQuestions();
  }, []);

  return (
    <QuestionsContext.Provider value={{ questions, findQuestionById, deleteQuestion , loading, addQuestion, updateQuestion}}>
      {children}
    </QuestionsContext.Provider>
  );
};
