import App from './app';

const app = new App({
    port: 3000,
    dbHost: 'localhost',
    dbPort: 3306,
    dbName: '',
    dbUser: '',
    dbPass: ''
});

/**
 * start app
 */
app.start();
