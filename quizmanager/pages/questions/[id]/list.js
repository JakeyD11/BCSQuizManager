import { getSession } from "next-auth/react";
import QuestionsOverview from "../../../components/question/QuestionsOverview";
import Button from "../../../components/ui/Button";
import Head from "next/head";

import { getQuizById } from "../../../helpers/api-util";
import classes from "../../../styles/question/QuestionList.module.scss";

const QuestionList = (props) => {
  return (
    <div className={classes.QuestionList}>
      <Head>
        <title>Question List | The Great Inquization</title>
      </Head>
      <QuestionsOverview quiz={props.quiz} currentUser={props.currentUser} />
      <div style={{ marginTop: "1.5rem", display: "flex", gap: "1.5rem" }}>
        {props.currentUser?.role === "edit" && (
          <Button link={`/questions/${props.quiz._id}/add`}>
            Add A New Question
          </Button>
        )}
        <Button link="/quiz">Go Back</Button>
      </div>
    </div>
  );
};

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req });
  if (!query.id || !session?.user) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  let quiz = await getQuizById(query.id);
  if (!quiz) {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }
  quiz = JSON.parse(JSON.stringify(quiz));
  console.log(quiz.questions);

  if (session?.user?.role !== "edit") {
    quiz.questions.forEach((question) => {
      delete question.correctAnswer;
    });
  }

  return {
    props: {
      quiz,
      currentUser: session?.user || null,
    },
  };
}

export default QuestionList;
