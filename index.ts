import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const PORT = 8000;
dotenv.config();

const DEFAULT_ADMIN = {
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD
}

const start = async () => {
  const app = express();

  const admin = new AdminJS({});

  const adminRouter = AdminJSExpress.buildRouter(admin);
  app.use(admin.options.rootPath, adminRouter);

  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    res.send(`<h1>AdminJS Playground</h1>`);
  });

  app.listen(PORT, () => {
    console.log(`AdminJS started @http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
