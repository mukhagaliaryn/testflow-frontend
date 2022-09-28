import { BACKEND_URL } from '../../../actions/types';

export default async (req, res) => {
    if (req.method === "POST") {
        const {uid, token } = req.body;
        const body = JSON.stringify({ uid, token })
        try {
            const response = await fetch(`${BACKEND_URL}/auth/users/activation/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            if (response.status === 204) {
                return res.status(200).json({ success: 'Activated successfully' });
            } else {
                return res.status(response.status).json({
                    error: 'Failed to activated'
                });
            }
            
        } catch (err) {
            return res.status(500).json({
                error: 'Something went wrong when trying to activated'
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}