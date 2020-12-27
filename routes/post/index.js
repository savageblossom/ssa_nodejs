import viewAll from './viewAll';
import submitPost from './submit';
import removePost from './remove';
import updatePost from './update';

const Router = require('express-promise-router');
const router = new Router();

router.use('/post', [viewAll, submitPost, removePost, updatePost]);

export default router;