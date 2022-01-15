const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const database = {
    users: [
        {
            id: '1',
            name: 'John',
            email: 'john@mail.com',
            password: 'john',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Jim',
            email: 'jim@mail.com',
            password: 'jim',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.json(database.users)
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id){
            found = true;
            return res.json(user)
        }

    })

    if(!found) {
        res.status(404).json('user doesnt exist')
    }
})

app.post('/signin', (req, res) => {
    const {email, password} = req.body
    let found = false
    database.users.forEach(user => {
        if (email === user.email &&
            password === user.password){
            found = true
            return res.json(database.users[0]);
        }

    })

    if (!found){
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body

    bcrypt.hash(password, null, null, function(err, hash) {
        return hash
    });

    database.users.push({
        id: '3',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length - 1])
})

app.put('/image', (req, res) => {
    const {id} = req.body
    let found = false

    database.users.forEach(user => {
        if (user.id === id){
            found = true
            user.entries++
            return res.json(user.entries)
        }

    })
    if (!found) {
        res.status(404).json('user doesnt exist')
    }
})

app.listen(3001, () => {
    console.log('app is running on port 3001')
})