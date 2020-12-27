import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import api from './routes';

const app = express();
const upload = multer();

app.use('/api', api);

app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

// app.listen(4000, () => { console.log(users)});
app.listen(4000);