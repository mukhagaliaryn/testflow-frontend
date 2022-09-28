import cookie from 'cookie';
import { BACKEND_URL, DEVELOPMENT } from '../../../actions/types';


export default async (req, res) => {
    if(req.method === "POST") {
        const { iin, password } = req.body;
        const body = JSON.stringify({ iin, password })
        try {
            const response = await fetch(`${BACKEND_URL}/auth/jwt/create/`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body
            });
            const data = await response.json();

            if(response.status === 200) {
                res.setHeader("Set-Cookie", [
                    cookie.serialize('access', data.access, {
                        httpOnly: true,
                        secure: DEVELOPMENT !== 'DEVELOPMENT',
                        maxAge: 604800,
                        sameSite: 'strict',
                        path: '/'
                    }),
                    cookie.serialize('refresh', data.refresh, {
                        httpOnly: true,
                        secure: DEVELOPMENT !== 'DEVELOPMENT',
                        maxAge: 86400,
                        sameSite: 'strict',
                        path: '/'
                    })
                ])
                
                return res.status(200).json({ success: data.success })
            } else {
                return res.status(response.status).json({error: data.error })
            }

        } catch (err) {
            return res.status(500).json({error: "Somthing went wrong authenticating"})
        }
    } else {
        res.setHeader("Allow", ["POST"])
        return res.status(405).json({"error": `Method ${req.method} not allowed.`})
    }
}