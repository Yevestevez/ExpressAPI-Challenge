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
const listenManager = () => {
    const addr = server.address();
    if (addr === null) return;
    let bind;
    if (typeof addr === 'string') {
        bind = 'pipe ' + addr;
    } else {
        bind =
            addr.address === '::'
                ? `http://localhost:${addr?.port}`
                : `${addr.address}:${addr?.port}`;
    }
    if (env.NODE_ENV !== 'dev') {
        console.log(`Server listening on ${bind}`);
    } else {
        log(`Servidor escuchando en ${bind}`);
    }
};

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

server.on('listening', listenManager);
server.on('error', errorManager);
server.listen(port);
