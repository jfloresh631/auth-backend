import express from 'express';
import dotenv from 'dotenv';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';
import verifyRouter from './routes/verify.js';
import errors from './middlewares/errors.js';
import limiter from './middlewares/rate-limiter.js';

dotenv.config();

const app = express();

app.set('port', process.env.PORT);

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errors.json);

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/verify', verifyRouter);

app.listen(app.get('port'));
