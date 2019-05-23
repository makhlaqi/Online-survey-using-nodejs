// Requromg messary nm middleware packages

var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// settomg up port
var PORT = process.env.PORT || 8070;

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("build"));
app.use(express.static("images-products"));

// new for submit
const Sequelize = require("sequelize");
var passport = require("passport");

//initialize an instance of Sequelize
sequelize = new Sequelize({
  database: 'webapp',
  username: 'root',
  password: '',
  dialect: 'mysql',
});

// check the database connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database: ', err));

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
    .catch(err => console.log('Problems with creating user table: ', err));



const Answer = sequelize.define('answers', {
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


// Define a procedure for parsing all the results

const createAnswer = async({ name, answer }) => {
  return await Answer.create({name, answer});
};

const getAllAnswers = async() => {
  return await Answer.findAll();
};

const getAllQuestions = async() => {
  return await Question.findAll();
};

const getAllUser = async() => {
  return await User.findAll();
};



Answer.sync()
  .then(() => console.log('Answer table created successfully'))
  .catch(err => console.log('Problems with creating answer table: ', err));

Question.sync()
  .then(() => console.log('Questio table created successfully'))
  .catch(err => console.log('Problems with creating answer table: ', err));




app.get('/answers', function(req, res) {
  getAllAnswers().then(answers => res.json(answers));
});

app.get('/questions', function(req, res) {
  getAllQuestions().then(questions => res.json(questions));
});

app.get('/users', function(req, res) {
  getAllUser().then(users => res.json(users));
});


app.get("/", function(req, res) {
  res.sendFile("index.html");
});

app.post('/answers', function(req,res){
  const {name, answer} = req.body;
  console.log(name, answer);
  createAnswer({name, answer}).then(Answer => 
    res.json({name, answer})
  );

});

var routes = require('./router/api')(app);
app.use('/',routes);

app.listen(PORT, function() {
  console.log("app listenning on Port" + PORT);
});
