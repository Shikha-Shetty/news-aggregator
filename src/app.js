const express = require('express');
const {signup, login} = require('./controllers/authController');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 3000;

try {
    mongoose.connect("mongodb://localhost:27017/usersdb", {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Connected to the db");
} catch (err) {
    conosole.log("Connection to the db failed");
}
app.post('/login', login);

app.get('/', (req, res) => {
    return res.status(200).send("Hello World");
});

app.post('/register', signup);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;