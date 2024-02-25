const express = require('express');
const {signup, login} = require('./controllers/authController');
const {getPreferences, updatePreferences} = require('./controllers/preferencesController');
const news = require('./controllers/newsController');
const mongoose = require('mongoose');
require('dotenv').config();
const verifyToken = require('./middleware/authJwt');

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

app.post('/register', signup);
app.post('/login', login);
app.get('/preferences', verifyToken, getPreferences);
app.put('/preferences', verifyToken, updatePreferences);
app.get('/news', verifyToken, news);

app.get('/', (req, res) => {
    return res.status(200).send("Hello World");
});


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;