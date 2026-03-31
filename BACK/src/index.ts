import { createServer } from 'node:http';
import { env } from 'node:process';
import debug from 'debug';

import { app } from './app.ts';

const log = debug('patatas:server');
const port = parseInt(env.PORT || '3040', 10);

const server = createServer(app);
log('Node Server created');

// Extra -> listenManager & errorManager

server.listen(port);
log(`Node Server listening in port [${port}]`);
