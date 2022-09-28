import cookie from 'cookie';
import { BACKEND_URL } from '../../../actions/types';

export default async (req, res) => {
    if (req.method === 'GET') {
        const cookies = cookie.parse(req.headers.cookie ?? '');
        const access = cookies.access ?? false;

        if (access === false) {
            return res.status(403).json({
                error: 'User forbidden from making the request'
            });
        }

        const body = JSON.stringify({
            token: access
        });

        try {
            const response = await fetch(`${BACKEND_URL}/auth/jwt/verify/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            if (response.status === 200) {
                return res.status(200).json({ success: 'Authenticated successfully' });
            } else {
                return res.status(response.status).json({
                    error: 'Failed to authenticate'
                });
            }
        } catch(err) {
            return res.status(500).json({
                error: 'Something went wrong when trying to authenticate'
            });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
};