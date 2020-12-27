import query from '../../db';

const Router = require('express-promise-router');
const router = new Router();

router.get('/viewPostComments', async (req, res) => {
    const { post_id } = req.body;

    const queryString = 
    `SELECT * FROM "comment"
    WHERE post_id=${post_id};`

    const { rows } = await query(queryString);
    
    res.send(rows);
})

export default router;