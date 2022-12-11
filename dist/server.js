import express from 'express';
import cors from 'cors';
import * as tools from './tools.js';
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
app.get('/', (req, res) => {
    res.send(`TEST API:
	<ul>
		<li><a href="nouns">GET /nouns</a></li>	
		<li><a href="writetext">POST /writetext</a></li>	
		<li><a href="readtext">GET /readtext</a></li>	
	</ul>
	
	`);
});
app.get('/nouns', (req, res) => {
    res.json(nouns);
});
app.post('/writetext', (req, res) => {
    const text = tools.getRandomIdNumber(10);
    tools.writeFile(testPathAndFileName, text);
    res.send('wrote ' + text);
});
app.get('/readtext', (req, res) => {
    const text = tools.readFile(testPathAndFileName);
    console.log(`[${text}]`);
    res.json(text);
});
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map