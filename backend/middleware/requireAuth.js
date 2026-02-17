import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';

export default function requireAuth(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    try {
        const decoded = jwt.verify(token, SECRET_JWT_KEY);
        req.user = decoded; // usuario disponible en req.user
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token invalid' });
    }
}