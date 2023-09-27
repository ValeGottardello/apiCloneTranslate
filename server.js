import express, { json } from 'express';
import cors from 'cors';
import { translate } from './openAi.js';

const app = express();
const port = 3000;

app.use(json());

app.use(cors({
  origin: process.env.CLIENT || process.env.CLIENT1,
  methods: ['POST']
}));

app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT || process.env.CLIENT1 || process.env.CLIENT2);
  res.setHeader('Access-Control-Allow-Methods', 'POST'); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
});

app.post('/translateCloneApp', async (req, res) => {
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

