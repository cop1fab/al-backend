import express from 'express';
import user from '../../controllers/users';
import check from '../../middleware/user';

const router = express.Router();

// @description creating user
router.post('/', check, user.signup);
router.post('/login', user.login);


export default router;
