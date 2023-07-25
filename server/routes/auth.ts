import { Router } from 'express';
import { tokenMiddleware } from '../middlewares/token.js';
import { authController } from '../controllers/auth.ctrl.js';
import errorHandleController from '../middlewares/errorHandler.js'

const router = Router();

router.post('/login', errorHandleController(authController.login));
router.get('/me', tokenMiddleware.check, errorHandleController(authController.me));


export default router;