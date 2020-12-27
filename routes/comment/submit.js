import query from '../../db';
import {authenticateJWT} from '../../services/verifyJWT';

const Router = require('express-promise-router');
const router = new Router();

router.post('/submit', authenticateJWT, async (req, res) => {
    const { user_id } = req.user;
    
    const { timestamp, content, post_id } = req.body;

    const postExists = (await query(`SELECT * FROM "post" where id=${post_id}`)).rowCount !== 0 ? true : false;

    if(!content) return res.send(`Empty comments are not allowed. Please type something and try again!`);
    else if(!postExists) return res.send(`Post doesn't exist!`);
    
    const queryString = 
    `INSERT INTO "comment" (date, text, user_id, post_id) 
    VALUES('${timestamp}', '${content}', ${user_id}, ${post_id});`;

    await query(queryString);

    res.sendStatus(200)
})

export default router;