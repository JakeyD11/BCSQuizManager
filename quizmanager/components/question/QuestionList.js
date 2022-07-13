import QuestionItem from "./QuestionItem";
import classes from "../../styles/question/QuestionList.module.scss";

function QuestionList(props) {
  return (
    <ul className={classes.QuestionList}>                               
      {props.data.map((question) => {
        const { _id, content, answers, correctAnswer } = question;

        return (
          <QuestionItem
            id={_id}
            key={_id}
            content={content}
            answers={answers}
            correctAnswer={correctAnswer}
            currentUser={props.currentUser}
          />
        );
      })}
    </ul>
  );
}

export default QuestionList;
