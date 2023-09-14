import express, { Express, Request, Response, Application } from 'express';
import path from 'path';

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.resolve('../frontend-web/build')));

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.resolve('../frontend-web/build/index.html'))  
});

app.get('/health-check', (req: Request, res: Response) => {
    res.send('OK');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
