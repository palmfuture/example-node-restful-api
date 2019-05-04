import express from 'express';
import middleware from './middleware';
import controllers from './controllers';
import Database from './database';

export default class App {

    constructor(env) {
        this.env = env;
        this.express = express;
        this.app = this.express();
        this.models = null;
    }

    controller = async () => {
        await controllers.initial(this.app, this.express, this.middleware, this.models);
        await controllers.start();
    }

    middleware = async () => {
        middleware.initial(this.app, this.express);
        middleware.start();
    }

    database = async () => {
        const database = new Database(this.env);
        await database.setup();
        await database.initial();
        this.models = await Promise.resolve(database.models);
    }

    start = async () => {
        await Promise.all([await this.database(), await this.middleware(), await this.controller()]);
        /* start server */
        this.app.listen(this.env.port, () => {
            console.log(`server is statring on port ${this.env.port}`);
        });
    }
}