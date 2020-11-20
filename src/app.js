const express = require('express');
const bodyparser = require('body-parser');
const routes = require('./routes');
const cors = require('cors');
const DB = require('./DataBase');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(routes);
DB.connect()

module.exports = app;