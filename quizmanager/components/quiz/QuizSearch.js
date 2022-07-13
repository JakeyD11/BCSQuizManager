import { useState } from 'react';
import Button from '../ui/Button';
import classes from '../../styles/quiz/QuizSearch.module.scss';
import subjects from '../../lib/subjects';

function QuizSearch({ onSearch, onReset }) {
    const [category, setCategory] = useState(subjects[0].category);
    const [difficulty, setDifficulty] = useState('easy');

    function submitHandler(e) {
        e.preventDefault();

        onSearch(category, difficulty);
    }

    function handleChangeCategory(e) {
        if (e.target.value === 'all') {
            setDifficulty('-');
        }
        setCategory(e.target.value);
    }

    function handleChangeDifficulty(e) {
        setDifficulty(e.target.value);
    }

    const categorySelects = subjects.map(cat => (
        <option key={cat.category} value={cat.category}>
            {cat.label}
        </option>
    ));

    return (
        <form className={classes.QuizSearch} onSubmit={submitHandler}>
            <div className={classes.Title}>
                Find A Quiz That's Right For You
            </div>
            <div className={classes.FormGroup}>
                <div className={classes.Select}>
                    <label htmlFor='category'>Subject</label>
                    <select
                        id='category'
                        onChange={handleChangeCategory}
                        value={category}>
                        <option value='all'>all</option>
                        {categorySelects}
                    </select>
                </div>
                <div className={classes.Select}>
                    <label htmlFor='difficulty'>difficulty</label>
                    <select
                        id='difficulty'
                        onChange={handleChangeDifficulty}
                        value={difficulty}>
                        <option value='-'>-</option>
                        <option value='easy'>Easy</option>
                        <option value='medium'>Medium</option>
                        <option value='hard'>Hard</option>
                    </select>
                </div>
            </div>
            <div className={classes.Actions}>
                <Button type='submit'>Find Quiz</Button>
                <Button type='button' onClick={onReset}>
                    Reset
                </Button>
            </div>
        </form>
    );
}

export default QuizSearch;