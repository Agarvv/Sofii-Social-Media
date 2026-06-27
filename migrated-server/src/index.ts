import 'module-alias/register';
import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import router from './routes';
import sequelize from './config/database';
import '@models/relations';
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';
import http from 'http'; 
import websocket from './websocket/websocket'; 
import authMiddleware from '@middleware/AuthMiddleware';
import passport from 'passport';
import session from 'express-session';
import '@config/GooglePassport'
import '@config/GithubPassport'
import cors from 'cors'

dotenv.config();

const app: Express = express();

const corsOptions = {
    origin: 'https://sofii-vsly.vercel.app',
    methods: 'GET, POST, PUT, DELETE', 
    credentials: true, 
};

app.use(cors(corsOptions)); 


app.use(session({
  secret: 'unsecureSecret2025', 
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const server = http.createServer(app); 

websocket.init(server);

app.use(cookieParser());
app.use(bodyParser.json());

/* 
app.use((req, res, next) => {
  if (req.path.startsWith('/api/sofii/auth') || req.path.startsWith('/auth')) {
    return next();
  }

  return authMiddleware(req, res, next);
});
*/

app.use(router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Sofii API Migration to TypeScript is OK!');
});

const port = process.env.PORT || 3000;

server.listen(port, async () => {
  console.log(`Sofii API started on port ${port}`);
  
  try {
    await sequelize.sync({ force: false });
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});
