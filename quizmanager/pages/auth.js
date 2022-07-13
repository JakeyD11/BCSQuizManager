import { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import AuthForm from '../components/auth/AuthForm';

function AuthPage() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.user) {
            router.replace('/');
        }
    }, [session, router]);

    return <AuthForm />;
}

export default AuthPage;