import classes from '../../styles/quiz/QuizHeader.module.scss';

function QuizHeader(props) {
    const { title } = props;

    return (
        <section className={classes.QuizHeader}>
            <div className={classes.Title}>{title}</div>
        </section>
    );
}

export default QuizHeader;