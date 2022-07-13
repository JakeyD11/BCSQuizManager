import { useState } from 'react';
import { signIn } from 'next-auth/react';

import Button from '../ui/Button';
import classes from '../../styles/auth/AuthForm.module.scss';

function AuthForm() {
    const [email, setEmail] = useState('');             //setting email field as blank
    const [password, setPassword] = useState('');       //setting password field blank



    function handleChangeEmail(e) {
        setEmail(e.target.value);                       //when submitted set email to the value of the input
    }

    function handleChangePassword(e) {                  //when submitted set password to the value of the input
        setPassword(e.target.value);
    }

    async function submitHandler(event) {               // when form is submitted checking if the credentials match the db
        event.preventDefault();                         // signing user in 

        await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

    }

    return (
        <section className={classes.AuthForm}>
            <form onSubmit={submitHandler}>                     
                <div className={classes.FormControl}>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        required
                        onChange={handleChangeEmail}
                        value={email}
                    />
                </div>
                <div className={classes.FormControl}>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        onChange={handleChangePassword}
                        value={password}
                    />
                </div>

                <div className={classes.Actions}>
                    <Button type='submit'>
                        Login
                    </Button>
                </div>
            </form>
        </section>
    );
}

export default AuthForm;