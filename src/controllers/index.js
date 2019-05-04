import HomeController from './HomeController';

class Controller {

    constructor() {
        this.express = null;
        this.app = null;
        this.middleware = null;
        this.models = null;
    }

    initial = async (app, express, middleware, models) => {
        this.app = app;
        this.express = express;
        this.middleware = middleware;
        this.models = models;
    }

    start = async () => {
        this.app.use('/', HomeController(this.express, this.middleware, this.models));
        console.log('controller has been established successfully');
    }

}

export default new Controller();