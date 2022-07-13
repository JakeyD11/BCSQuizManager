import classes from '../../styles/quiz/QuizLogistics.module.scss';

function QuizLogistics(props) {
    const { category, difficulty, image, imageAlt } = props;

    return (
        <section className={classes.QuizLogistics}>
            <div className={classes.Image}>
                <img src={`/${image}`} alt={imageAlt} />
            </div>
            <ul className={classes.List}>
                <li>
                    <h1>{category}</h1>
                </li>
                <li>
                    <h2>{difficulty}</h2>
                </li>
            </ul>
        </section>
    );
}

export default QuizLogistics;