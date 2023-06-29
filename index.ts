import AdminJS from 'adminjs';
import {Adapter, Resource, Database} from '@adminjs/sql';
import AdminJSExpress from '@adminjs/express';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const PORT = 8000;
const app = express();
dotenv.config();

const DEFAULT_ADMIN = {
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD
}

AdminJS.registerAdapter({Database, Resource});

const start = async () => {
  const db = await new Adapter('postgresql', {
    connectionString: 'postgres://mr_bean1:password@localhost:5432/adminjs_panel',
    database: 'adminjs_panel'
  }).init();

  const admin = new AdminJS({
    resources: [
      {
        resource: db.table('users'),
        options: {}
      }
    ]
  });

  admin.watch();

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
