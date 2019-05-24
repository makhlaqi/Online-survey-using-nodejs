module.exports = function (app){

var express = require('express');
var router =  express.Router();
var passport = require('passport');
//const bcrypt = require('bcrypt');
// const{ User, Product} = require('../db');

// import passport and passport-jwt modules
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
const Sequelize = require("sequelize");

// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'nZr4u7x!A%D*G-KaPdRgUkXp2s5v8y/B'; // 256 bit key
jwtOptions.algorithm = 'RS256';




sequelize = new Sequelize({
  database: 'webapp',
  username: 'root',
  password: '',
  dialect: 'mysql',
});

const User = sequelize.define('user', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  password: {
      type: Sequelize.STRING,
      allowNull: false
  }
});

User.sync()
  .then(() => console.log('User table created successfully'))
  .catch(err => console.log('Problems with creating user table: ', err))



const Answer = sequelize.define('Answer', {
answer: {
  type: Sequelize.STRING
},
name: {
  type: Sequelize.STRING
},
});



const Question = sequelize.define('Question', {  
    question: {
      type: Sequelize.STRING
    },
    option1: {
      type: Sequelize.STRING
    },
    option2: {
      type: Sequelize.STRING
    },
    option3: {
      type: Sequelize.STRING
    },

});

// Lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {

  console.log('Payload received', jwt_payload);
  let user = getUser({ id: jwt_payload.id });

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

  
const getUser = async obj => {
    return await User.findOne({
      where: obj,
    });
};
  
// Home route

router.get('/', function(req, res) {    
  res.sendFile('index.html');
});

// Login route

router.post('/login', async function(req, res, next) {
  const { name, password } = req.body;
  console.log(name, password);
  
  if (name && password) {
    // we get the user with the name and save the resolved promise
    
    let user = await getUser({ name });
    if (!user) {
      res.status(401).json({ msg: 'No such user found', user });
    }
    //console.log(user);
   if (user.password === password) {
      // from now on we’ll identify the user by the id and the id is
      console.log('ready to sign token')
      // the only personalized value that goes into our token
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtOptions.secretOrKey);
      var returnJson = { msg: 'ok', token: token }; 
      console.log(returnJson);
      res.json(returnJson);
    } else {
      res.status(401).json({ msg: 'Password is incorrect' });
    }
  }
});


// ----------------------------------------------------------------
// Protected route paths
// ----------------------------------------------------------------

// Get all users

router.get('/users', passport.authenticate('jwt',{session:false}), function(req, res) {
    getAllUsers().then(user => res.json(user));
});


return router;
}