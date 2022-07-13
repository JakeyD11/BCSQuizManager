import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import axios from "../../helpers/with-axios";
import QuizSearch from "../../components/quiz/QuizSearch";
import QuizList from "../../components/quiz/QuizList";
import Head from "next/head";

function Quiz({ currentUser }) {
  const router = useRouter();
  const [quizItems, setQuizItems] = useState([]);
  const [quizCategory, setQuizCategory] = useState("All");
  const [quizDifficulty, setQuizDifficulty] = useState("-");

  useEffect(() => {
    axios
      .get("/quiz")
      .then((res) => {
        setQuizItems(res.data);
      })
      .catch((err) => {
        console.log(err.message);
        router.push("/auth");
      });
  }, []);

  function handleGetSearch(category, difficulty) {
    if (category === "all") {
      handleResetSearch();
      return;
    }
    category = category.toLowerCase();
    difficulty = difficulty.toLowerCase();
    axios
      .get(`/quiz?category=${category}&difficulty=${difficulty}`)
      .then((res) => {
        setQuizItems(res.data);
        setQuizCategory(category);
        setQuizDifficulty(difficulty);
      });
  }

  function handleResetSearch() {
    axios.get("/quiz").then((res) => {
      setQuizItems(res.data);
      setQuizCategory("all");
    });
  }

  return (
    <>
      <Head>
        <title>Search | The Quiz Manager</title>
        <meta name="description" content="Find a lot of great quiz..." />
      </Head>
      <QuizSearch onSearch={handleGetSearch} onReset={handleResetSearch} />
      <QuizList
        currentUser={currentUser}
        items={quizItems}
        category={quizCategory}
        difficulty={quizDifficulty}
      />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: {
      currentUser: session?.user || null,
    },
  };
}

export default Quiz;
