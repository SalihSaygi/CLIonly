import express from 'express'
import helmet from 'helmet'
import passport from 'passport'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

import passportRouter from './routers/public/github.routes'

const app: express.Application = express()

app.use(
  cors({
    origin: process.env.CLIENT,
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    credentials: true,
  })
);

app.use(helmet());

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', passportRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (res: express.Response) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.use(morgan('dev'));
  app.get('/', (res: express.Response) => {
    res.send('API is running....');
  });
}

export default app