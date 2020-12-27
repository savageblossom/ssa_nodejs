import jwt from 'jsonwebtoken';
import query from '../db';
import multer from 'multer';
import { accessTokenSecret, refreshTokenSecret } from '../services/tokenSecret';


const Router = require('express-promise-router');
const router = new Router();
const upload = multer();

let refreshTokens = [];

router.use(upload.array());

router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    console.log(req)

    const { rows } = await query(`SELECT * FROM "user";`)

    const user = rows.find(u => { return u.login === login && u.password === password });

    if (user) {
        const accessToken = jwt.sign({ user_id: user.id, username: user.name, role: user.role }, accessTokenSecret, { expiresIn: '20m' });
        const refreshToken = jwt.sign({ user_id: user.id, username: user.name, role: user.role }, refreshTokenSecret);

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('Username or password incorrect!');
    }
});

router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ user_id: user.id, username: user.name, role: user.role }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(token => t !== token);

    res.send("Logout successful");
});

export default router;