module.exports.handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('All fields required');
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(userData => {
        const isPasswordValid = bcrypt.compareSync(password, userData[0].hash);
        if(isPasswordValid){
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => res.json(user[0]))
            .catch(err => res.status(400).json('Unable to get the user'));
        }else {
            res.status(400).json('Invalid credentials');
        }
    })
    .catch(err => res.status(400).json('Invalid credentials'));
};

