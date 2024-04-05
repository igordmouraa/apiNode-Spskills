const express = require("express");
const app = express();
const cors = require('cors');
const db = require('../src/database/conn')

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
        this.express.get('/teste/', (_, res) =>{
            try{
                db.query(
                    'SELECT * FROM user'
                );

            }catch(error){
                res.status(500).json({ error: 'erro ao registrar rota'})
            }
        });
    }
}

module.exports = new  AppController().express;