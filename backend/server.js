import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

import productRoutesAPI from './routes/productsAPI.js';
import requireAuth from './middleware/requireAuth.js'
import { PORT, SECRET_JWT_KEY } from './config.js';
import { UserRepository } from './user-repository.js';

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: 'https://expert-trout-g47r9qqjw57g2979w-5173.app.github.dev',
    credentials: true,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Esto maneja preflight

//local: http://localhost:5173

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({ message: "Backend funcionando correctamente" });
});

/* ===== LOGIN ===== */
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserRepository.login({ username, password }); //comprobar que usuario exista

        //genera token
        const token = jwt.sign(
            { id: user._id, username: user.username },
            SECRET_JWT_KEY,
            { expiresIn: '1h' }
        );
        //gaurda cookie 
        res.cookie('access_token', token, {
            httpOnly: true, //no accesible desde js
            sameSite: 'none', //Evita CSRF pero deberi ser strict
            secure: true,//process.env.NODE_ENV === 'production', //solo HTTPS en producción
            maxAge: 1000 * 60 * 60 //duración de 1 hora
        });

        //devolvemos un json 
        res.json({
            success: true,
            user: {
                id: user._id,
                username: user.username
            }
        });

    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

/* ===== REGISTER ===== */
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Intentando registrar a:", username); // Log de control

        const id = await UserRepository.create({ username, password });
        console.log("Asigno id");

        const token = jwt.sign(
            { id, username },
            SECRET_JWT_KEY,
            { expiresIn: '1h' }
        );
        console.log("Ya he creado el token");

        res.cookie('access_token', token, {
            httpOnly: true,
            sameSite: 'none', //ojo por el codespace
            secure: true ,//process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60
        });
        console.log("guardamos la cookie");

        res.json({
            success: true,
            user: { id, username }
        });

    } catch (error) {
        console.log("Error al registrase")
        res.status(400).json({ error: error.message });
    }
});

app.get('/profile', requireAuth, (req, res) => {
    res.json({
        username: req.user.username,
        id: req.user.id
    });
});

/* ===== LOGOUT ===== */
app.get('/logout', (req, res) => {
    res.clearCookie('access_token');
    res.json({ success: true });
});

/* ===== API PROTEGIDA ===== */
app.use('/api/products', productRoutesAPI);

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
