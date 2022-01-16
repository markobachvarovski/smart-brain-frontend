const handleImage = (req, res, db) => {
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
}

module.exports = {
    handleImage: handleImage
}