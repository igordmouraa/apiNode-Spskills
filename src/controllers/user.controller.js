const db = require('../../src/database/conn')

class userController {

    static async createUser(req, res) {
        const { name, email, username, password } = req.body;

        try {
            await db.query(
                'INSERT INTO user (name, email, username, password) VALUES (?, ?, ?, ?)',
                [name, email, username, password]
            );
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao criar cliente' })
        }
    }
}

module.exports = userController;