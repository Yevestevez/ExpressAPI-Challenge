import { Router } from 'express';
import debug from 'debug';

import { PotatoesController } from '../controller/potatoes-controller.ts';

const log = debug('patatas:router');

const router = (controller: PotatoesController) => {
    const router = Router();
    log('Potatoes router created');

    router.get('/', controller.getAll);

    return router;
};

export default router;
