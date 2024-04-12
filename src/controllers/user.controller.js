const db = require('../../src/database/conn')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secretKey = '249797249879smkk'

class userController {

    static async createUser(req, res) {
        const { name, email, username, password } = req.body;
        // const passwordHashed = bcrypt.hash(password, 10);
        const errors = {};

        try {

            if (!email || typeof email !== 'string' || !email.includes('@')) {
                errors.email = ['Invalid email format'];
            }

            if (!password || typeof password !== 'string' || password.length < 6) {
                errors.password = ['Password must be at least 6 characters long'];
            }

            if (!name || typeof name != 'string') {
                errors.name = ['Name is required']
            }

            if (!username || typeof username != 'string') {
                errors.username = ['Username is required']
            }

            if (Object.keys(errors).length > 0) {
                return res.status(422).json({ message: 'Invalid properties', errors });
            }



            const existingUser = await db.query('SELECT * FROM user WHERE email = ? OR username = ?', [email, username]);

            if (existingUser && existingUser.length > 0) {
                existingUser.forEach(user => {
                    if (user.email === email) {
                        errors.email = ['Email already exists'];
                    }
                    if (user.username === username) {
                        errors.username = ['Username already exists'];
                    }
                });
                // Verifica se há erros após a verificação do usuário existente
                if (Object.keys(errors).length > 0) {
                    console.log("Errors after checking existing user:", errors);
                    return res.status(422).json({ message: 'Invalid properties', errors });
                }
            }


            await db.query(
                'INSERT INTO user (email, password, name, username) VALUES (?, ?, ?, ?)',
                [email, password, name, username]
            );

            const token = jwt.sign({ email }, secretKey);

            return res.status(201).json({ token })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: 'Erro ao criar cliente' })
        }
    }

    static async deleteUser(req, res) {
        const id = req.params.id;

        try {
            await db.query(
                'DELETE FROM user WHERE id = ?', [id]
            );

            return res.status(204).json({ message: 'No Content' })

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'error' + error.message })
        }
    }

    static async signin(req, res) {
        const { email, password } = req.body;
        const errors = {};

        if (!email || typeof email !== 'string' || !email.includes('@')) {
            errors.email = ['Invalid email format'];
        }

        if (!password || typeof password !== 'string' || password.length < 6) {
            errors.password = ['Password must be at least 6 characters long'];
        }

        if (Object.keys(errors).length > 0) {
            return res.status(422).json({ message: 'Invalid properties', errors });
        }

        try {
            // Consulta o banco de dados
            const [users] = await db.query('SELECT * FROM user WHERE email = ?', [email]);

            if (users.length === 0) {
                return res.status(401).json({ error: 'User not found' });
            }

            const user = users[0];
            // const passwordHashed = user.password;

            // const passwordMatch = await bcrypt.compare(password, passwordHashed);

            // if (!passwordMatch) {
            //     return res.status(401).json({ error: 'Incorrect password' });
            // }

            if(user.password !== password){
                return res.status(400).json({ message: 'password incorrect'})
            }

            // Gera token JWT
            const token = jwt.sign({ email }, secretKey);

            return res.status(200).json({ message: 'Logged in successfully', token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error while logging in' });
        }
    }
}

module.exports = userController;