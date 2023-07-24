import { Router } from 'express';
import { tokenMiddleware } from '../middlewares/token.js';
import { userController } from '../controllers/users.ctrl.js';
import errorHandleController from '../middlewares/errorHandler.js'

const router = Router();


router.post('/', errorHandleController(userController.create));
router.delete('/:user_id', tokenMiddleware.check, errorHandleController(userController.delete));
router.get('/:user_id', errorHandleController(userController.get));


export default router;