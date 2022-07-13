import axios from "../../helpers/with-axios";
import Button from "../ui/Button";
import classes from "../../styles/profile/Quizzes.module.scss";

const Quizzes = (props) => {
  const { data = [] } = props; //setting the data as an array for the props

  function handleDeleteQuiz(id) {
    // this function finds the quiz by id and delets the selected quiz
    axios.delete(`/quiz/${id}`).then(() => {
      const quizItem = document.getElementById(id);
      if (quizItem) {
        quizItem.remove();
      }
    });
  }

  const quizItems = data.map(
    (
      { _id, title, summary, questions } // mapping through the details of the quiz and displaying them, added buttons to take user to add, overview and delete
    ) => (
      <li key={_id} id={_id} className={classes.QuizItem}>
        <div className={classes.QuizTitle}>{title}</div>
        <div className={classes.QuizSummary}>{summary}</div>
        <div className={classes.QuizLength}>
          # of questions: {questions.length}
        </div>
        <div className={classes.Actions}>
          <Button theme="invert" link={`/questions/${_id}/add`}>
            add questions
          </Button>
          <Button theme="primary" link={`/questions/${_id}/list`}>
            overview
          </Button>
          <Button theme="danger" onClick={handleDeleteQuiz.bind(null, _id)}>
            Delete
          </Button>
        </div>
      </li>
    )
  );

  return (
    <div className={classes.Quizzes} id="#quizzes">
      <div className={classes.Header}>My Quizzes</div>
      <ul className={classes.QuizList}>{quizItems}</ul>
    </div>
  );
};

export default Quizzes;
