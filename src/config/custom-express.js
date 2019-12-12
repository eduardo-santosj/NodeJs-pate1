const express = require('express')
const app = express();
const rotas = require('../app/rotas/rotas');
const methodOverride = require('method-override');

// marko
require('marko/node-require');
require('marko/express');

// base de dados
const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('data.db');

// middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// arquivos estaticos
app.use('/estatico', express.static('src/app/public'));

// VERIFICAR TIPO DE REQUISIÇÃO
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}))


rotas(app);

module.exports = app;