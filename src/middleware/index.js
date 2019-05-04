import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import { verify } from 'jsonwebtoken';

class Middleware {

    constructor() {
        this.app = null;
        this.express = null;
        this.key = 'key';
    }

    initial = (app, express) => {
        this.app = app;
        this.express = express;
    }

    start = () => {
        this.app.use(cors());
        this.app.use(helmet());
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(compression());;
        console.log('middleware has been established successfully');
    }

    private = () => {
        try {
            if (!req.headers.authorization || !(verify(req.headers.authorization, this.key))) {
                return res.status(401).send({ status: 401, result: 'Unauthorized' });
            }
            else next();
        } catch (ex) {
            return res.status(401).send({ status: 401, result: 'Unauthorized' });
        }
    }
}

export default new Middleware();