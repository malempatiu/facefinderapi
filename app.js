const express    = require('express'),
      app        = express(),
      bodyParser = require('body-parser'),
      cors       = require('cors'),
      bcrypt     = require('bcrypt'),
      knex       = require('knex');

const users      = require('./routes/users');   
const signin     = require('./routes/signin'); 
const register   = require('./routes/register');
const imageCount = require('./routes/imagecount');
const imageUrl   = require('./routes/imageurl');    

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'face-finder-api'
    }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {users.totalUsers(req, res, db)});
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegistration(req, res, db, bcrypt)});
app.put('/image', (req, res) => {imageCount.handleImageEntriesUpdate(req, res, db)});
app.post('/imageurl', (req, res) => {imageUrl.handleImageUrl(req, res)});

app.listen(3000, () => {
    console.log('FF server has started');
});