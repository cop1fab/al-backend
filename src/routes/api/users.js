import express from 'express';
import user from '../../controllers/users';
import check from '../../middleware/user';
import VerifyLink from '../../controllers/mail/verifyLink';


const router = express.Router();

// @description creating user
router.post('/', check, user.signup);
router.post('/login', user.login);
router.post('/send-verification-link', VerifyLink.sendEmail);
router.get('/verify/:token', VerifyLink.activate);


export default router;
