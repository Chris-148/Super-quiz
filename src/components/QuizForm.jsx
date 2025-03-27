import { QuestionsContext } from "../context/QuestionsContext";
import { QuizContext } from "../context/QuizContext";
import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const QuizForm = () => {
  const { questionsTopic, createArrayQuestion } = useContext(QuestionsContext);
  const { createQuiz } = useContext(QuizContext);
  // const [topic, setTopic] = useState("");
  // const [difficulty, setDifficulty] = useState("");

  function listNbr() {
    let listNbr = [];
    for (let i = 10; i <= 50; i++) {
      listNbr.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return <>{listNbr}</>;
  }

  const [quizReady, setQuizReady] = useState(false);
  let nav = useNavigate();
  const [newQuiz, setNewQuiz] = useState({
    id: uuidv4(),
    userId: "",
    QuestionArray: [],
    scores: [],
    topic: "",
    difficulty: "",
    nbrQuestions: 10,
  });

  function handleNameChange(e) {
    let name = e.target.name;

    let value = e.target.value;

    setNewQuiz({ ...newQuiz, [name]: value });
  }

  async function handleCreateQuiz(e) {
    e.preventDefault();
    let arrayQuestions = await createArrayQuestion(
      newQuiz.topic,
      newQuiz.difficulty,
      newQuiz.nbrQuestions
    );

    let updatedQuiz = {
      ...newQuiz,
      QuestionArray: arrayQuestions,
    };

    if (arrayQuestions.length < 10) {
      toast.error(
        "Sorry u need to select other settings, this quiz have less than 10 questions"
      );
      return setQuizReady(false);
    } else {
      setNewQuiz(updatedQuiz);
      setQuizReady(true);
    }
  }

  // WHYYYY ?
  useEffect(() => {
    if (quizReady) {
      createQuiz(newQuiz);
      setQuizReady(false);
      toast.success("Quiz create. Good Game, Have Fun!!!");
      nav(`/quiz/${newQuiz.id}`);
    }
  }, [newQuiz, quizReady]);

  return (
    <>
      <h2>Generate a Quiz</h2>
      <form onSubmit={handleCreateQuiz}>
        <div className="home-form-container">
          <div className="home-user-play">
            <div className="input-container">
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder=" "
                required=" "
                value={newQuiz.userId}
                onChange={handleNameChange}
              />
              <label htmlFor="userId" className="label">
                Gamer Name
              </label>
              <div className="underline"></div>
            </div>
            <button type="submit" className="btn btn-success">
              <span>Play</span>
            </button>
          </div>
          <div className="home-quiz-setting">
            <legend className="m-2">
              <i className="fa-solid fa-gear"></i>Quiz settings
            </legend>
            <div className="group-form-container">
              <div className="select-container">
                <label htmlFor="topic" className="form-label">
                  Topic
                </label>
                <select
                  className="form-select mb-3"
                  id="topic"
                  name="topic"
                  onChange={handleNameChange}
                  value={newQuiz.topic}
                >
                  <option value="">All Topic</option>
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
                <label htmlFor="difficulty" className="form-label">
                  Difficulty
                </label>
                <select
                  className="form-select mb-3"
                  id="difficulty"
                  name="difficulty"
                  onChange={(e) => handleNameChange(e)}
                  value={newQuiz.difficulty}
                >
                  <option value="">All difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div className="select-container">
                <label htmlFor="nbrQuestions" className="form-label">
                  Numbers of questions
                </label>
                <select
                  className="form-select mb-3"
                  id="nbrQuestions"
                  name="nbrQuestions"
                  onChange={(e) => handleNameChange(e)}
                  value={newQuiz.nbrQuestions}
                >
                  {listNbr()}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
