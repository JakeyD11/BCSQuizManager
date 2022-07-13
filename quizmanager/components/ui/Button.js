import Link from 'next/link';
import classes from '../../styles/ui/Button.module.scss';

function Button({
    type = 'button',
    theme = 'primary',
    link,
    onClick,
    disabled,
    children,
}) {
    const btnClasses = [classes.Button];

    switch (theme) {
        case 'invert':
            btnClasses.push(classes.Invert);
            break;
        case 'primary':
            btnClasses.push(classes.Primary);
            break;
        case 'success':
            btnClasses.push(classes.Success);
            break;
        case 'danger':
            btnClasses.push(classes.Danger);
            break;
    }

    if (link) {
        return (
            <Link href={link}>
                <a className={btnClasses.join(' ')}>{children}</a>
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={btnClasses.join(' ')}
            onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;