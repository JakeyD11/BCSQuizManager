import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import User from '../../../models/User';

export default NextAuth({
    session: {
        strategy: 'jwt',
    },
    providers: [
        Credentials({
            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({
                    email: credentials.email,
                });

                if (!user) {
                    throw new Error('No user found.');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error('Invalid login credentials.');
                }
                return user;
            },
        }),
    ],
    callbacks: {
        session: async ({ session, token }) => {
            if (session?.user) {
                await connectToDatabase();
                const user = await User.findById(token.sub);
                if (user) {
                    session.user.role = user.role || 'restricted';
                    session.user.id = token.sub;
                } else {
                    return;
                }
            }
            return session;
        },
    },
});