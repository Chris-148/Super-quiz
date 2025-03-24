import { QuestionsContext } from "../context/QuestionsContext";
import { QuizContext } from "../context/QuizContext";
import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export const QuizForm = () => {
  const { questionsCategory, createArrayQuestion } =
    useContext(QuestionsContext);
  const { createQuiz } = useContext(QuizContext);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizReady, setQuizReady] = useState(false);
  let nav = useNavigate();
  const [newQuiz, setNewQuiz] = useState({
    id: uuidv4(),
    userId: "",
    QuestionArray: [],
  });

  function handleNameChange(e) {
    setNewQuiz({ ...newQuiz, ["userId"]: e.target.value });
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();
    let arrayQuestions = await createArrayQuestion(category, difficulty);

    let updatedQuiz = {
      ...newQuiz,
      QuestionArray: arrayQuestions,
    };
    setNewQuiz(updatedQuiz);
    setQuizReady(true);
  }

  // WHYYYY ?
  useEffect(() => {
    if (quizReady) {
      createQuiz(newQuiz);
      setQuizReady(false);
      
      nav(`/quiz/${newQuiz.id}`);
    }
  }, [newQuiz, quizReady]);

  return (
    <>
      <h2 className="text-center my-2">Start Quiz</h2>
      <form onSubmit={handleCreateQuiz}>
        <fieldset>
          <div className="row">
            <div className="col-4 m-3">
              <label htmlFor="userId">Gamer Name</label>
              <input
                className="form-control"
                type="text"
                id="userId"
                name="userId"
                placeholder="Your Name"
                value={newQuiz.userId}
                onChange={(e) => handleNameChange(e)}
              />
              <button type="submit" className="btn btn-success my-4 w-50">
                Play
              </button>
            </div>
            <div className="col-7 m-3 border border-3 border-primary">
              <legend className="m-2">Quiz settings</legend>
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="category"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">All Category</option>
                {questionsCategory.map((category, index) => {
                  return (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="difficulty" className="form-label">
                Difficulty
              </label>
              <select
                className="form-select "
                id="difficulty"
                name="difficulty"
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
              >
                <option value="">All difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};
