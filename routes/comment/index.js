import viewPostComments from './viewPostComments';
import viewUserComments from './viewUserComments';
import submit from './submit';

const Router = require('express-promise-router');
const router = new Router();

router.use('/comment', [viewPostComments, viewUserComments, submit]);

export default router;