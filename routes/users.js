module.exports.totalUsers = (req, res, db) => {
    db.select('*').from('users')
    .then(rows => res.send(rows))
    .catch(err => res.status(400).json(err));
};