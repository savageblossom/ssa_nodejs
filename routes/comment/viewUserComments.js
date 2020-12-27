import query from '../../db';

const Router = require('express-promise-router');
const router = new Router();

router.get('/viewUserComments', async (req, res) => {
    const { user_id } = req.body;

    const queryString = 
    `SELECT * FROM "comment"
    WHERE user_id=${user_id};`

    const { rows } = await query(queryString);
    
    if(rows.length === 0) return res.send('There\'s no comments from that user or that user doesn\'t even exist!')

    return res.send(rows);
})

export default router;