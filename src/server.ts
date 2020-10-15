import express from 'express';
import { getRepository } from 'typeorm';

import './database/connection';

import User from './models/Users';

const app = express();

app.use(express.json());

app.post('/users', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = getRepository(User);

  const user = await usersRepository.create({ email, password });

  await usersRepository.save(user);

  return response.status(200).json(user);
})

app.listen(3000, () => console.log('server is running on port 3000'));
