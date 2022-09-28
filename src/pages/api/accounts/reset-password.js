import { BACKEND_URL } from '../../../actions/types';


export default async (req, res) => {
    if (req.method === "POST") {
        const { email } = req.body;
        const body = JSON.stringify({ email })
        try {
            const response = await fetch(`${BACKEND_URL}/auth/users/reset_password/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            if (response.status === 204) {
                return res.status(200).json({ success: 'Password reset successfully' });
            } else {
                return res.status(response.status).json({
                    error: 'Failed to reset password'
                });
            }
            
        } catch (err) {
            return res.status(500).json({
                error: 'Something went wrong when trying to reset password'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}