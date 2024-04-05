const express = require("express");
const app = express();
const cors = require('cors');

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
        this.express.use('/', routes);
        this.express.get('/health/', (_, res) =>{
            res.send({ message: 'teste'});
        });
    }
}

module.exports = new  AppController().express;