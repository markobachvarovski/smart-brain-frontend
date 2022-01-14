const express = require('express')

const app = express()
app.use(express.json())

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
    database.users.forEach(user => {
        if (user.id === id){
            return res.json(user)
        }

    })

    res.status(404).json('user doesnt exist')
})

app.post('/signin', (req, res) => {
    const {email, password} = req.body

    database.users.forEach(user => {
        if (email === user.email &&
            password === user.password){
            return res.json(user)
        }

    })

    res.status(400).json('error logging in')
})

app.post('/register', (req, res) => {
    const {name, email, password} = req.body

    database.users.push({
        id: '3',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[2])
})

app.post('/image', (req, res) => {
    const {id} = req.body

    database.users.forEach(user => {
        if (user.id === id){
            user.entries ++
            return res.json(user)
        }

    })

    res.status(404).json('user doesnt exist')

})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})