import { getSession } from "next-auth/react";
import { randomize } from "../../../helpers/general-util";
import Question from "../../../models/Question";
import Quiz from "../../../models/Quiz";

export default async function useHandler(req, res) {
  const session = await getSession({ req });
  const { method } = req;

  if (!session?.user) {
    return res.status(401).json({
      status: "fail",
      message: "Please log in for access.",
    });
  }

  if (session.user.role !== "edit") {
    return res.status(403).json({
      status: "fail",
      message: "You are not allowed to do that.",
    });
  }

  let question = {};
  switch (method) {
    case "POST":
      const quiz = await Quiz.findById(req.body.quizId);
      if (!quiz) {
        return res.status(400).json({
          status: "fail",
          message: "No quiz found with that id.",
        });
      }

      if (!quiz.creator.equals(session.user.id)) {
        return res.status(403).json({
          status: "fail",
          message: "You are not allowed to do that.",
        });
      }

      question = await Question.create({
        quizId: quiz._id,
        quizVersion: quiz.version,
        content: req.body.question,
        answers: req.body.answers,
        correctAnswer: 0,
      });

      quiz.questions.push(question._id);
      await quiz.save();

      return res.status(201).json({
        status: "success",
        message: "Successfully created question.",
        question,
      });
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
