const app = require('./index')
const Port = 5000;

app.listen(Port, () =>{
    console.log(`Servidor rodando e conectado na porta: ${Port}`);
})