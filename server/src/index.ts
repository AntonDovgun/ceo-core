import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.get('/about', (req, res) => {
  res.send('About us page');
})

app.listen(3000, () => console.log('Server is running on 3000 port!'));
