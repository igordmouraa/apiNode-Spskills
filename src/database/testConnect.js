const db = require('./conn')

function testConnect(res) {


    try {
        const test = db.query(
            'SELECT  "Conexão bem sucedida" AS Mensagem'
        )

        console.log('Conexão com o MySQL bem sucedida! ✔', test);
        return res.status(200).json({ message: 'Conexão com o MySQL bem sucedida! ✔', test})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao se conectar ao servidor:', error})
    }
}

module.exports = testConnect;