import express from 'express';

export const app = express();
console.log('Express app created');

app.get('/', (req, res) => {
    res.send('Express app working');
});
