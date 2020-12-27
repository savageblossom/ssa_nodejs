import query from '../../db';
import {authenticateJWT} from '../../services/verifyJWT';

const Router = require('express-promise-router');
const router = new Router();

router.post('/submit', authenticateJWT, async (req, res) => {
    const { role, user_id } = req.user;

    if(role !== "admin") {
        return res.sendStatus(403);
    }
    
    const { timestamp, content } = req.body;

    const queryString = 
    `INSERT INTO "post" (date, content, author_id) 
    VALUES('${timestamp}', '${content}', ${user_id});`

    await query(queryString);

    res.sendStatus(200)
})

export default router;