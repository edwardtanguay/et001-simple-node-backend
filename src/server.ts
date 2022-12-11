import express from 'express';
import cors from 'cors';

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
	res.send('API: see <a href="nouns">/nouns</a>');
});

app.get('/nouns', (req: express.Request, res: express.Response) => {
	res.json(nouns);
});


app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`);
});