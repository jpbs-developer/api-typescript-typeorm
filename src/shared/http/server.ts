import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import cors from 'cors';
import routes from './routes';

import '../typeorm/index';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	if (error instanceof AppError) {
		return response
			.status(error.statusCode)
			.json({ status: 'error', message: error.message });
	}
	return response
		.status(500)
		.json({ status: 'error', message: 'Internal server error!' });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
