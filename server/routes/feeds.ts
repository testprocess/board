import { Router } from 'express';
import { feedController } from '../controllers/feed.ctrl.js';

import { tokenMiddleware } from '../middlewares/token.js';


const router = Router();

router.get('/:idx', feedController.get);
router.get('/', feedController.get);
router.post('/', tokenMiddleware.check, feedController.insert);
router.delete('/:idx', tokenMiddleware.check, feedController.delete);
router.put('/:idx', tokenMiddleware.check, feedController.update);


export default router;