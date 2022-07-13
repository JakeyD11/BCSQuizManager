import { getQuizById } from '../../../helpers/api-util';
import QuestionsOverview from '../../../components/question/QuestionsOverview';

import classes from '../../../styles/pages/QuestionEdit.module.scss';

const QuizEdit = props => {
    return (
        <div className={classes.QuestionEdit}>
            <div className={classes.Header}>Add or Edit Questions</div>
            <QuestionsOverview quiz={props.quiz} />
        </div>
    );
};

export async function getServerSideProps(ctx) {
    if (!ctx.query.quizId) {
        return {
            redirect: '/',
        };
    }
    let quiz = await getQuizById(ctx.query.quizId);
    if (!quiz) {
        return {
            redirect: '/',
        };
    }
    quiz = JSON.parse(JSON.stringify(quiz));
    return {
        props: {
            quiz,
        },
    };
}

export default QuizEdit;