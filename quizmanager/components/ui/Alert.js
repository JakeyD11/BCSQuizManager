import { useRef } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
import classes from '../../styles/ui/ErrorAlert.module.scss';

function Alert({ type = 'error', callback, timeout = 3000 }) {
    const alertRef = useRef(null);
    const alertTimeout = useRef();
    const alertClasses = [classes.Alert];

    useEffect(() => {
        if (!isNaN(timeout) && callback) {
            alertTimeout.current = setTimeout(callback, timeout);
        }

        return () => {
            clearTimeout(alertTimeout.current);
        };
    }, [callback, timeout]);

    switch (type) {
        case 'error':
            alertClasses.push(classes.Error);
            break;
        case 'info':
            alertClasses.push(classes.Info);
            break;
        case 'success':
            alertClasses.push(classes.Success);
            break;
    }

    return (
        <div className={classes.Alert} ref={alertRef}>
            {props.children}
        </div>
    );
}

export default Alert;