const express = require("express");
require("dotenv").config();
const indexRouter = require("./src/router/index")
const app = express();

const errorHandler = require("./src/middlewares/errorHandler")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', indexRouter)
app.use(errorHandler)

app.get('/', (_req, res) =>{
    res.sendFile('index', {root: _dirname})
})

module.exports = app;