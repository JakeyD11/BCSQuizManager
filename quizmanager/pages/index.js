import { getSession } from "next-auth/react";
import Head from "next/head";
import Button from "../components/ui/Button";
import classes from "../styles/pages/HomePage.module.scss";

function HomePage(props) {
  const ctaText = props.isSignedIn
    ? "Enter the Quiz Manager"
    : "please sign in to get started";
  const ctaLink = props.isSignedIn ? "/quiz" : "/auth";

  return (
    <div className={classes.HomePage}>
      <Head>
        <title>Home | Quiz Management Portal</title>
        <meta
          name="description"
          content="The home page Quiz Management Portal"
        />
      </Head>
      <div className={classes.Hero}>
        <div className={classes.Header}>
          Welcome To The Quiz Management Portal
        </div>
        <div className={classes.CTA}>
          <p>{ctaText}</p>
          <Button link={ctaLink}>Let's Go</Button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: {
      isSignedIn: session?.user || false,
    },
  };
}

export default HomePage;
