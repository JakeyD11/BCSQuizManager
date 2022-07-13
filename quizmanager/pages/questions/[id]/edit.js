import { useRouter } from "next/router";
import axios from "../../../helpers/with-axios";
import QuestionForm from "../../../components/question/QuestionForm";
import { getQuestionById } from "../../../helpers/api-util";

import classes from "../../../styles/pages/QuestionEdit.module.scss";
import { getSession } from "next-auth/react";

const QuestionEdit = (props) => {
  const router = useRouter();

  function handleEditSubmit(questionData) {
    axios.patch(`/questions/${props.question._id}`, questionData).then(() => {
      router.push(`/questions/${props.question.quizId}/list`);
    });
  }

  return (
    <div className={classes.QuestionEdit}>
      <div className={classes.Header}>Edit Your Question</div>
      <QuestionForm
        type="edit"
        questionData={props.question}
        onSubmit={handleEditSubmit}
      />
    </div>
  );
};

export async function getServerSideProps({ req, query }) {
  const session = await getSession({ req });
  if (session?.user?.role !== "edit") {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  if (!query.id) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  let question = await getQuestionById(query.id);
  if (!question) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  question = JSON.parse(JSON.stringify(question));
  return {
    props: {
      currentUser: session?.user || null,
      question,
    },
  };
}

export default QuestionEdit;
