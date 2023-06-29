var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AdminJS from 'adminjs';
import { Adapter, Resource, Database } from '@adminjs/sql';
import AdminJSExpress from '@adminjs/express';
import express from 'express';
import dotenv from 'dotenv';
const PORT = 8000;
const app = express();
dotenv.config();
const DEFAULT_ADMIN = {
    email: process.env.DEFAULT_ADMIN_EMAIL,
    password: process.env.DEFAULT_ADMIN_PASSWORD
};
AdminJS.registerAdapter({ Database, Resource });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield new Adapter('postgresql', {
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
    app.get('/', (req, res) => {
        res.send(`<h1>AdminJS Playground</h1>`);
    });
    app.listen(PORT, () => {
        console.log(`AdminJS started @http://localhost:${PORT}${admin.options.rootPath}`);
    });
});
start();
