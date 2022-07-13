import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import Quiz from "../../../models/Quiz";

export default async function useHandler(req, res) {
  const {
    query: { category, difficulty },
    method,
  } = req;
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).json({
      status: "fail",
      message: "Please log in for access.",
    });
  }

  await connectToDatabase();

  let quizList = [];
  switch (method) {
    case "GET":
      if (category || difficulty) {
        quizList = await Quiz.find({ category, difficulty });
        return res.status(200).send(quizList);
      }
      quizList = await Quiz.find({});
      return res.status(200).send(quizList);
    case "POST":
      if (session.user.role !== "edit") {
        return res.status(403).json({
          status: "fail",
          message: "You are not allowed to do that.",
        });
      }
      let quiz = await Quiz.create({
        ...req.body,
        creator: session.user.id,
      });
      return res.status(201).send(quiz);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
