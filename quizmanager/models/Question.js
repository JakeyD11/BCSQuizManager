import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  answers: [
    {
      type: String,
    },
  ],
  correctAnswer: {
    type: Number,
    required: true,
  },
});

questionSchema.pre("validate", function (next) {
  if (this.answers.length > 5) throw "answers exceeds maximum array size (5)!";
  if (this.answers.length < 3) throw "answers exceeds minimum array size (3)!";
  next();
});

export default mongoose?.models?.Question ||
  mongoose.model("Question", questionSchema);
