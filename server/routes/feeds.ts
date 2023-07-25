import { Router } from 'express';
import { feedController } from '../controllers/feed.ctrl.js';
import { tokenMiddleware } from '../middlewares/token.js';
import errorHandleController from '../middlewares/errorHandler.js'


const router = Router();

router.get('/:idx', errorHandleController(feedController.get));
router.get('/', errorHandleController(feedController.get));
router.post('/', tokenMiddleware.check, errorHandleController(feedController.insert));
router.delete('/:idx', tokenMiddleware.check, errorHandleController(feedController.delete));
router.put('/:idx', tokenMiddleware.check, errorHandleController(feedController.update));


export default router;