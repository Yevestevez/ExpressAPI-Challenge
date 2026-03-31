import { Router } from 'express';
import { PotatoesController } from '../controller/potatoes-controller.ts';

const router = (controller: PotatoesController) => {
    const router = Router();
    console.log('Potatoes router created');

    router.get('/', controller.getAll);

    return router;
};

export default router;
