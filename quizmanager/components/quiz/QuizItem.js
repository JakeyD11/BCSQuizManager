import classes from "../../styles/quiz/QuizItem.module.scss";
import Button from "../ui/Button";

function QuizItem(props) {
  const { currentUser, title, summary, category, difficulty, id } = props;
  let diffColor = "green";

  switch (difficulty) {
    case "hard":
      diffColor = "red";
      break;
    case "medium":
      diffColor = "orangered";
  }

  return (
    <li className={classes.QuizItem}>
      <div className={classes.Title}>{title}</div>
      <div className={classes.Content}>
        <div className={classes.Details}>
          <div className={classes.Category}>{category}</div>
          <div className={classes.Difficulty} style={{ color: diffColor }}>
            {difficulty}
          </div>
          <p className={classes.Summary}>{summary}</p>
        </div>
        <div className={classes.Actions}>
          {currentUser.role === "view" && (
            <Button theme="invert" link={`/questions/${id}/list`}>
              View
            </Button>
          )}
          <Button link={`/quiz/${id}`}>Details</Button>
        </div>
      </div>
    </li>
  );
}

export default QuizItem;
