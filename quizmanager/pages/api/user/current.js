import { getSession } from 'next-auth/react';
import User from '../../../models/User';

export default async function useHandler(req, res) {
    if (req.method !== 'GET') return;

    let user;
    const session = await getSession({ req });

    if (session.user?.id) {
        user = await User.findById(session.user.id);
    }

    if (!user) {
        return res.status(200).json(user);
    }

    return res.status(401).send({
        status: 'fail',
        message: 'Please log in again.',
    });
}