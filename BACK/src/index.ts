import { createServer } from 'node:http';
import { app } from './app.ts';
import { env } from 'node:process';

const port = parseInt(env.PORT || '3040', 10);

const server = createServer(app);
console.log('Node Server created');

// Extra -> listenManager & errorManager

server.listen(port);
console.log(`Node Server listening in port [${port}]`);
