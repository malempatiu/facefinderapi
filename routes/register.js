module.exports.handleRegistration = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('All fields required');
    }
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
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => res.json(user[0]))
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch((err) => {
        if(err.constraint === "users_email_key"){
            res.status(400).json('Email already exists')
        } else {
            res.status(400).json('unable to register');
        }
    });
};