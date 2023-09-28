import express, { json } from 'express';
import cors from 'cors';
import { translate } from './openAi.js';
import { refererCheck } from './middleware.js';

const app = express();
const port = 3000;

app.use(json());

app.use(cors({
  origin: process.env.CLIENT_PRODUCTION || process.env.CLIENT,
  methods: ['POST']
}));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_PRODUCTION || process.env.CLIENT);
  res.setHeader('Access-Control-Allow-Methods', 'POST'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
});

app.post('/translateCloneApp', async (req, res) => {

  refererCheck(req, res, next)

  try {

    const { fromLanguage, toLanguage, text } = req.body;
    const translation = await translate({ fromLanguage, toLanguage, text });
    console.log(fromLanguage, toLanguage, text, 'Translation:', translation)
    res.json({ translation });

  } catch (error) {
    console.error('Error in the translation:', error);
    res.status(500).json({ error: 'Error in the translation' });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${port} port`);
});

