import { BACKEND_URL } from '../../../actions/types';


export default async (req, res) => {
    if (req.method === "POST") {
        const { uid, token, new_password, re_new_password } = req.body;
        const body = JSON.stringify({ uid, token, new_password, re_new_password })
        try {
            const response = await fetch(`${BACKEND_URL}/auth/users/reset_password_confirm/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            if (response.status === 204) {
                return res.status(200).json({ success: 'Password reset confirm successfully' });
            } else {
                return res.status(response.status).json({
                    error: 'Failed to password reset confirm'
                });
            }
            
        } catch (err) {
            return res.status(500).json({
                error: 'Something went wrong when trying to password reset confirm'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}