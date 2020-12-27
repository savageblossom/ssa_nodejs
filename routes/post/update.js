import query from '../../db';
import {authenticateJWT} from '../../services/verifyJWT';

const Router = require('express-promise-router');
const router = new Router();

router.post('/update', authenticateJWT, async (req, res) => {
    const { role } = req.user;

    if(role !== "admin") {
        return res.sendStatus(403);
    }

    const { post_id, content } = req.body;

    const queryString = 
    `UPDATE "post"
    SET content='${content}'
    WHERE id=${post_id}`

    await query(queryString);

    res.sendStatus(200)
})

export default router;