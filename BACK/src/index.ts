import { createServer, ServerResponse } from 'node:http';
import { env } from 'node:process';
import debug from 'debug';

import { app } from './app.ts';
import type { HttpError } from './errors/http-error.ts';

const log = debug('patatas:server');
const port = parseInt(env.PORT || '3040', 10);

const server = createServer(app);
log('Node Server created');

// Extra -> listenManager & errorManager

const errorManager = (error: HttpError, res: ServerResponse) => {
    if (!('statusCode' in error)) {
        error = {
            ...new Error('Internal Server Error'),
            status: 500,
            statusMessage: 'Internal Server Error',
        };
    }

    const errorInfo = `Error ${error.status}: ${error.statusMessage}`;
    res.statusCode = error.status;
    res.statusMessage = error.message;
    res.end(errorInfo);
};

server.on('error', errorManager);
server.listen(port);
log(`Node Server listening in port [${port}]`);
