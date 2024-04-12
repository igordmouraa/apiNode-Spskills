const express = require("express");
const app = express();
const cors = require('cors');
const testConnect = require('./database/testConnect')

class AppController {
    constructor (){
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors())
    }

    routes(){
        const routes = require ('../src/routes/routes')
        this.express.use('/api/v1', routes);
        this.express.get('/health/', (_, res) =>{
            res.send({ message: 'teste'});
        });
        this.express.get('/testConnect/', (_, res) =>{
            testConnect(res);
        });
    }
}

module.exports = new  AppController().express;