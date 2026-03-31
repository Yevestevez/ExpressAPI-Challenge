import express from 'express';

export const app = express();
console.log('Express app created');

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('Express app working');
});
