import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import axios from "../../../helpers/with-axios";
import QuestionForm from "../../../components/question/QuestionForm";
import classes from "../../../styles/pages/QuestionAdd.module.scss";

const QuestionAdd = ({ quizId }) => {
  const router = useRouter();

  function handleSubmitQuestion(questionData) {
    axios.post("/questions", { quizId, ...questionData }).then(() => {
      router.push(`/questions/${quizId}/list`);
    });
  }

  return (
    <div className={classes.QuestionAdd}>
      <QuestionForm quizId={quizId} onSubmit={handleSubmitQuestion} />
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

  return {
    props: {
      currentUser: session?.user || null,
      quizId: query.id,
    },
  };
}
export default QuestionAdd;
