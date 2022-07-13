import classes from "../../styles/quiz/QuizSummary.module.scss";

const QuizSummary = ({ summary }) => {
  return (
    <div className={classes.QuizSummary}>
      <div className={classes.Title}>Quiz Summary</div>
      <p className={classes.Summary}>{summary}</p>
    </div>
  );
};

export default QuizSummary;
