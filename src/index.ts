import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes';

// Load environment variables from .env file
dotenv.config();

// Boot express
const app: Application = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the routes defined in the index.ts file
app.use('/', routes);

// Application routing
app.use('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ data: 'Hello API' });
});

// Start server
app.listen(port, () => console.log(`Server is listening on port http://localhost:${port}`));
