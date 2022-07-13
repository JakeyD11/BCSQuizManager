import { useState } from "react";
import classes from "../../styles/pages/QuizCreate.module.scss";
import { useRouter } from "next/router";
import subjects from "../../lib/subjects";
import { getSession } from "next-auth/react";
import Button from "../../components/ui/Button";

function CreateQuiz() {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [featured, setFeatured] = useState("notFeatured");

  function handleChangeTitle(quiz) {
    setTitle(quiz.target.value);
  }

  function handleChangeCategory(quiz) {
    setCategory(quiz.target.value);
  }

  function handleChangeDifficulty(quiz) {
    setDifficulty(quiz.target.value);
  }

  function handleChangeSummary(quiz) {
    setSummary(quiz.target.value);
  }
  function handleChangeFeatured(quiz) {
    setFeatured(quiz.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    const quiz = {
      category,
      difficulty,
      summary,
      title,
    };

    fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(quiz),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/quiz");
      });
  }

  const categorySelects = subjects.map((cat) => (
    <option key={cat.category} value={cat.category}>
      {cat.label}
    </option>
  ));

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h2>Create A new Quiz</h2>
      <div>
        <div className={classes.control}>
          <label htmlFor="title"> Quiz Title</label>
          <input
            type="text"
            name="title"
            required
            onChange={handleChangeTitle}
            value={title}
          />
        </div>
        <label htmlFor="category">Subject</label>
        <select id="category" onChange={handleChangeCategory} value={category}>
          {categorySelects}
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="difficulty">Quiz Difficulty</label>
        <select
          name="difficulty"
          required
          onChange={handleChangeDifficulty}
          value={difficulty}
        >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="featured">Featured Quiz?</label>
        <select
          name="featured"
          required
          onChange={handleChangeFeatured}
          value={featured}
        >
          <option value="true">featured</option>
          <option value="false">notfeatured</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor="summary">Quiz Summary</label>
        <textarea
          type="text-area"
          cols={40}
          rows={5}
          name="summary"
          required
          onChange={handleChangeSummary}
          value={summary}
        />
      </div>
      <div className={classes.action}>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}

export async function getServerSideProps({ req }) {
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
    },
  };
}
export default CreateQuiz;
