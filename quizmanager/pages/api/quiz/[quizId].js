import { getSession } from "next-auth/react";
import Quiz from "../../../models/Quiz";
import Question from "../../../models/Question";

export default async function useHandler(req, res) {
  const session = await getSession({ req });
  const { quizId } = req.query;
  const { method } = req;

  if (!session?.user) {
    res.status(401).json({
      status: "fail",
      message: "Please sign in to access this route",
    });
  }

  let quiz = {};
  switch (method) {
    case "GET":
      if (!quizId) {
        return res.status(400).json({
          status: "fail",
          message: "You must provide an id.",
        });
      }
      quiz = await getQuizById(quizId).populate("questions");
      return res.status(200).json({
        status: "success",
        quiz,
      });
    case "DELETE":
      if (session.user.role !== "edit") {
        return res.status(403).json({
          status: "fail",
          message: "You are not allowed to do that.",
        });
      }

      if (!quizId) {
        return res.status(400).json({
          status: "fail",
          message: "You must provide an id.",
        });
      }

      quiz = await Quiz.findById(quizId);
      if (!quiz) {
        return res.status(400).json({
          status: "fail",
          message: "No quiz found with id.",
        });
      }

      if (!quiz.creator.equals(session.user.id)) {
        return res.status(403).json({
          status: "fail",
          message: "You are not allowed to do that.",
        });
      }

      const questions = await Question.find({ quizId });
      const removeAll = questions.map((q) => q.remove());
      await Promise.all(removeAll);
      await quiz.remove();
      return res.status(200).json({
        status: "success",
        message: "Successfully removed quiz.",
      });
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
