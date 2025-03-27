import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../config/config";
import toast from "react-hot-toast";
export const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionsTopic, setQuestionsTopic] = useState([
    "General Knowledge", "Books", "Film", "Music", "Video Games", "Board Game", "Science", "Science: Computers", "Mathematics", "Mythology", "Sports", "Geography", "History", "Art", "Celebrities", "Animals", "Comics", "Japanise Anime and Manga", "Cartoon and Animation", "Harry Potter"
  ])
  // const [updateThisQuestion, setUpdateThisQuestion] = useState(null)

  // Function to have all questions
  async function fetchAllQuestions() {
    try {
      const response = await axios.get(`${API_URL}/question`);
      setQuestions(response.data);
      setLoading(false);
    //   console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // create question Array with somes parameter
  async function createArrayQuestion(category, difficulty, nbrQuestions){
    await fetchAllQuestions()
    // console.log(category, difficulty)
    // filter question by category or difficulty or both or nothing
      const filteredQuestions = questions.filter((question) => {
        if(category && difficulty){
          return question.topic === category && question.difficulty === difficulty
        }else if(category){
          
          return question.topic === category;
        }
        else if(difficulty) {
          return question.difficulty === difficulty;
        }else{
          return true
        }
      })

      // shuffle this new array 
      // sort organize the array and put the next value before or after the previous value depends of the resulte insade return.
      // here Math.random() - 0.5 are negative or positive randomly(depends of Math.random).
      const shuffledQuestions = filteredQuestions.sort(() => Math.random() - 0.5)
      
      // return 10 questions
      return shuffledQuestions.slice(0,nbrQuestions)
  }


  //function to find one question by id
  function findQuestionById(id) {
    console.log(questions.find((question) => question.id == id))
    return questions.find((question) => question.id == id);
  }

  async function deleteQuestion(id){
    try{
        await axios.delete(`${API_URL}/question/${id}`)
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
      const response = await axios.post(`${API_URL}/question`, question);
      toast.success("Question added successfully!")
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
    const response = await axios.put(`${API_URL}/question/${question.id}`, question)
    toast.success("Question update successfully!")
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
    <QuestionsContext.Provider value={{ questions, questionsTopic, findQuestionById, deleteQuestion , loading, addQuestion, updateQuestion, createArrayQuestion}}>
      {children}
    </QuestionsContext.Provider>
  );
};
