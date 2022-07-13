import { getSession } from "next-auth/react";
import Quizzes from "../../components/profile/Quizzes";
import { getQuizByUser } from "../../helpers/api-util";
import classes from "../../styles/pages/Profile.module.scss";

function ProfilePage(props) {
  return (
    <div className={classes.Profile}>
      <div className={classes.Header}>Quiz Manager</div>

      <Quizzes data={props.quizzes} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  let quizzes = await getQuizByUser(session?.user.id);
  quizzes = JSON.parse(JSON.stringify(quizzes));

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session, quizzes },
  };
}

export default ProfilePage;
