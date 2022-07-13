import { useState, useEffect } from 'react';
import SunSolid from '../../assets/svg/sun-solid.svg';
import SunOutline from '../../assets/svg/sun-regular.svg';

import classes from '../../styles/ui/ThemeToggle.module.scss';

const ThemeToggle = props => {
    const [theme, setTheme] = useState('light');
    const toggleContainerClass = [classes.ToggleContainer];
    const iconClass = [classes.Icon];

    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    function handleToggleTheme() {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    }

    if (theme === 'dark') {
        toggleContainerClass.push(classes.Dark);
        iconClass.push(classes.Dark);
    }

    return (
        <div className={classes.ThemeToggle} onClick={handleToggleTheme}>
            <div className={iconClass.join(' ')}>
                <SunSolid />
                <SunOutline />
            </div>
            <div className={toggleContainerClass.join(' ')}>
                <span className={classes.ToggleBG}></span>
                <span className={classes.Toggler}></span>
            </div>
        </div>
    );
};

export default ThemeToggle;