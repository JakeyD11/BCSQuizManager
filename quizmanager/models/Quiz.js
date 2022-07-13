import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
    },
    category: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
    },
    title: {
        type: String,
        required: true,
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question',
        },
    ],
});

export default mongoose?.models?.Quiz || mongoose.model('Quiz', quizSchema);