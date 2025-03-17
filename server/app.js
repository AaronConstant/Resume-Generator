const express = require('express');
const app = express();
const cors = require('cors');

const coverLetterController = require('./controllers/coverLetterController');
const resumeController = require('./controllers/resumeController');
const userController = require('./controllers/userController');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to AI Generator Resume/Cover Letter');
});

app.use('/users', userController);
app.use('/users/:user_id/resumes', resumeController);
app.use('/users/:user_id/coverLetters', coverLetterController);

app.get("*", (req, res) => {
    res.status(404).json({ error: "Path not found" });
});

module.exports = app;