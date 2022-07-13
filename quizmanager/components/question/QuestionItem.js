import classes from "../../styles/question/QuestionItem.module.scss";

const QuestionItem = (props) => {
  const letters = ["A", "B", "C", "D", "E"];                //setting the letters for questions display
  const correctAnswer = letters[props.correctAnswer];       //setting a letter for the correct answer as it would be a number in the array

  return (
    <div className={classes.QuestionItem}>
      <div className={classes.Question}>
        Q{props.num}: {props.content}
      </div>
      {props.currentUser?.role !== "restricted" && (
        <ul className={classes.AnswerList}>
          {props.answers.map((answer, i) => {
            return (
              <li key={answer}>
                <span className={classes.letters}>{letters[i]}</span>: {answer}
              </li>
            );
          })}
        </ul>
      )}

      {props.currentUser?.role === "edit" && (
        <p className={classes.Correct}>
          The correct answer is <span>{correctAnswer}</span>
        </p>
      )}
    </div>
  );
};

export default QuestionItem;
