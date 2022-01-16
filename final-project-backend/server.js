const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        port : 5432,
        user : 'postgres',
        password : 'markoproject',
        database : 'final-project'
    }
});

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.json('Welcome!')
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;

    db.select('*')
        .from('users')
        .where('id', id)
        .then(user => {
            if(user.length !== 0){
                res.json(user[0])
            }
            else{
                res.status(404).json('User not found')
            }
    })
        .catch(err => res.status(400).json('Error getting user'))

})

app.post('/signin', (req, res) => {
    const {email, password} = req.body

    db.select('email', 'hash')
        .from('login')
        .where('email', '=', email)
        .then(user => {
            if (bcrypt.compareSync(password, user[0].hash)){
                return db.select('*')
                    .from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            }else{
                res.status(400).json('Invalid credentials')
            }

        })
        .catch(err => res.status(400).json('Invalid credentials'))
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .returning('*')
                    .then(user => {res.json(user[0])})
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('Unable to register'))

})

app.put('/image', (req, res) => {
    const {id} = req.body

    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {

            if (entries.length !== 0) {
                res.json(entries[0])
            } else {
                res.status(404).json('User not found')
            }
        })
        .catch(err => res.status(400).json('Unable to get entries'))

})

app.listen(3001, () => {
    console.log('app is running on port 3001')
})