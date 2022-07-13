import Head from 'next/head';
import { getQuizById } from '../../../helpers/api-util';
import Button from '../../../components/ui/Button';
import QuizHeader from '../../../components/quiz/QuizHeader';
import QuizLogistics from '../../../components/quiz/QuizLogistics';
import QuizSummary from '../../../components/quiz/QuizSummary';

import classes from '../../../styles/pages/QuizDetail.module.scss';

function QuizDetail(props) {
    const quiz = props.selectedQuiz;

    if (!quiz) {
        return (
            <div className='center'>
                <p> Loading...!</p>
            </div>
        );
    }

    return (
        <div className={classes.QuizDetail}>
            <Head>
                <title>{quiz.title}</title>
                <meta name='description' content='amazing Quiz...' />
            </Head>
            <QuizHeader title={quiz.title} />
            <div className={classes.Content}>
                <QuizLogistics
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    image={quiz.image}
                    imageAlt={quiz.title}
                />
                <QuizSummary summary={quiz.summary} />
                <div className={classes.Actions}>
                    <Button link={`/questions/${quiz._id}`}>View Quiz</Button>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps(context) {
    const quizId = context.params.quizId;

    let quiz = await getQuizById(quizId);
    quiz = JSON.parse(JSON.stringify(quiz));
    return {
        props: {
            selectedQuiz: quiz,
        },
    };
}

export default QuizDetail;