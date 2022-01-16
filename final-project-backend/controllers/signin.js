const handleSignin = (req, res, db, bcrypt) => {
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
            } else {
                res.status(400).json('Invalid credentials')
            }

        })
        .catch(err => res.status(400).json('Invalid credentials'))
}

module.exports = {
    handleSignin: handleSignin
}