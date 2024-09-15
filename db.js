const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const getClient = () => {
    return new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'backend',
        password: 'Amina0403',
        port: 5432
    });
};

async function getUsersfromDB(name,password){
    let client;

    try {
        client = getClient();
        await client.connect();

        const result = await client.query("SELECT * FROM users WHERE name = $1",[name]);
            try {
                const isPasswordMatch = await bcrypt.compare(password, result.password);
                if (isPasswordMatch) {
                    console.log('Success');
                } else {
                    console.log('Password does not match');
                }
            } catch (err) {
                console.error(err.message);
            }
        return result.rows
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (client) {
            await client.end();
        }
    }
};

async function postUsersToDB(name, email, password) {
    console.log(`${name}${email}${password}`);
    const client = getClient();
    try {
        await client.connect();
        const existingUser = await client.query(
            'SELECT * FROM users WHERE name = $1 OR email = $2',
            [name, email]
        );

        if (existingUser.rows.length > 0) {

            return { error: 'Account with this username or email already exists' };
        }

        const hash = await bcrypt.hash(password, saltRounds);

        await client.query(
            'INSERT INTO users(name, email, password) VALUES($1, $2, $3)',
            [name, email, hash]
        );

      
        return { message: 'User added successfully' };
    } catch (error) {
        console.error(error);
        
        return { error: 'Internal Server Error' };
    } finally {
        await client.end();
    }
}


module.exports = {getUsersfromDB,postUsersToDB};