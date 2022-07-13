import { useState } from "react";
import { useRouter } from "next/router";

import axios from "../../helpers/with-axios";
import { randomize } from "../../helpers/general-util";
import CircleCheck from "../../assets/svg/circle-check-solid.svg";
import classes from "../../styles/question/QuestionsOverview.module.scss";

const QuestionsOverview = ({ quiz, currentUser }) => {
  const [questions, setQuestions] = useState(quiz.questions);
  const [answersShow, setAnswersShow] = useState([]);
  const router = useRouter();

  function handleEditQuestion(id) {
    //when edit is clicked take user to page for editing question
    router.push(`/questions/${id}/edit`);
  }

  function handleDeleteQuestion(id) {
    //when delete is clicked remove the question with id from db
    axios.delete(`/questions/${id}`).then(() => {
      setQuestions((q) => q.filter((question) => question._id !== id));
    });
  }

  function toggleShowAnswers(id) {
    setAnswersShow((st) => {
      if (st.includes(id)) {
        return st.filter((x) => x !== id);
      }
      return [...st, id];
    });
  }

  return (
    <div className={classes.QuestionsOverview}>
      <div className={classes.Header}>{quiz.title}</div>
      <div className={classes.Overview}>
        <div className={classes.Title}>Quiz Questions Overview</div>
        <ul className={classes.QuestionList}>
          {questions.map((q, i) => (
            <li key={q._id} id={q._id} className={classes.QuestionItem}>
              <div className={classes.Question}>
                Q{i + 1}: {q.content}
              </div>
              <div className={classes.Actions}>
                <div
                  className={classes.ShowHide}
                  onClick={toggleShowAnswers.bind(null, q._id)}
                >
                  {answersShow.includes(q._id)
                    ? "Hide Answers"
                    : "Show Answers"}
                </div>
                {currentUser?.role === "edit" && (
                  <>
                    <div
                      className={classes.Edit}
                      onClick={handleEditQuestion.bind(null, q._id)}
                    >
                      Edit
                    </div>
                    <div
                      className={classes.Delete}
                      onClick={handleDeleteQuestion.bind(null, q._id)}
                    >
                      Delete
                    </div>
                  </>
                )}
              </div>
              <ol className={classes.Answers}>
                {randomize(q.answers).map((answer, y) => {
                  if (!answersShow.includes(q._id)) return;
                  return (
                    <li
                      key={`${i}-${y}`}
                      className={[
                        classes.AnswerItem,
                        q.answers[q.correctAnswer] === answer &&
                        currentUser.role === "edit"
                          ? classes.Correct
                          : "",
                      ].join(" ")}
                    >
                      {answer}
                      <CircleCheck />
                    </li>
                  );
                })}
              </ol>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuestionsOverview;
