import auth from './auth';
import post from './post';
import comment from './comment';

const Router = require('express-promise-router');
const router = new Router();

router.use('/', [auth, post, comment]);

export default router;