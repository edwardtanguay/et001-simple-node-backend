import express from 'express';
import cors from 'cors';
import * as tools from './tools.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db: any = new Low(adapter);
await db.read();

dotenv.config();
const EXECUTING_ENVIRONMENT = process.env.EXECUTING_ENVIRONMENT;
const testPathAndFileName = './src/data/test.txt';

const app = express();
app.use(cors());
const port = 3011;

const nouns = [
	{
		"article": "die",
		"singular": "Notiz",
		"plural": "die Notizen"
	},
	{
		"article": "das",
		"singular": "Konzept",
		"plural": "die Konzepte"
	}, {
		"article": "der",
		"singular": "Commit",
		"plural": "die Commits"
	}
];

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(`TEST API executing at <b>${EXECUTING_ENVIRONMENT}</b>
	<ul>
		<li><a href="nouns">GET /nouns</a></li>	
		<li><a href="writetext">POST /writetext</a></li>	
		<li><a href="readtext">GET /readtext</a></li>	
		<li><a href="readlowdb">GET /readlowdb</a></li>	
	</ul>
	
	`);
});

app.get('/nouns', (req: express.Request, res: express.Response) => {
	res.json(nouns);
});

app.get('/readlowdb', (req: express.Request, res: express.Response) => {
	const lowdbNouns = db.data.nouns;
	res.json(lowdbNouns);
});

app.post('/writetext', (req: express.Request, res: express.Response) => {
	const text = tools.getRandomIdNumber(10);
	tools.writeFile(testPathAndFileName, text);
	res.send('wrote ' + text)
});

app.get('/readtext', (req: express.Request, res: express.Response) => {
	const text = tools.readFile(testPathAndFileName);
	console.log(`[${text}]`);
	res.json(text);
});

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});