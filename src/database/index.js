import Sequelize from 'sequelize';
import {
    User
} from './models';

export default class Database {

    constructor(env) {
        this.env = env;
        this.Sequelize = Sequelize;
        this.sequelize = this.setup();
        this.models = {};
    }

    initial = async () => {
        try {
            await this.sequelize.authenticate();
            console.log('database start initial setup');
            this.start();
        } catch (ex) {
            console.error('Unable to connect to the database:', ex);
            process.exit(1);
        }
    }

    setup = () => {
        return new Sequelize(this.env.dbName, this.env.dbUser, this.env.dbPass, {
            host: this.env.dbHost,
            port: this.env.dbPort,
            dialect: 'mariadb',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            define: {
                charset: 'utf8',
                collate: 'utf8_general_ci',
                timestamps: true
            }
        });
    }

    start = async () => {
        await Promise.all([
            this.models.User = await new User(this.sequelize, this.Sequelize).initial(),
            await this.relation(),
            console.log('database has been established successfully')
        ]);
    }

    relation = async () => {

    }
}