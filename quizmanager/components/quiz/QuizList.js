import QuizItem from "./QuizItem";
import classes from "../../styles/quiz/QuizList.module.scss";

function QuizList(props) {
  const { currentUser, category, difficulty, items } = props;
  return (
    <ul className={classes.QuizList}>
      <div className={classes.Title}>
        {category} Quizzes {category !== "all" ? `(${difficulty})` : ""}
      </div>
      {items.map((quiz) => (
        <QuizItem
          currentUser={currentUser}
          key={quiz._id}
          id={quiz._id}
          title={quiz.title}
          category={quiz.category}
          difficulty={quiz.difficulty}
          summary={quiz.summary}
          image={quiz.image}
        />
      ))}
    </ul>
  );
}
export default QuizList;
