import query from '../../db';

const Router = require('express-promise-router');
const router = new Router();

router.get('/viewAll', async (req, res) => {
    const { rows } = await query(`SELECT * FROM "post";`)
    res.send(rows );
})

export default router;