const express = require('express');

const ProfessorController = require('./controllers/ProfessorController');
const AlunoController = require('./controllers/AlunoController');
const AuthController = require('./controllers/AuthController');
const Auth = require('./functions/auth');
const routes = express.Router();

//Cadastro Professor
routes.post('/cadprofessor', ProfessorController.store);

//Cadastro Aluno
routes.post('/cadaluno', AlunoController.store);

//Login
routes.post('/siginprofessor', AuthController.LoginProfessor);
routes.post('/siginaluno', AuthController.LoginAluno);

routes.post('/refreshaluno', Auth.authorize, AuthController.refreshTokenAluno);
routes.post('/refreshprofessor', Auth.authorize, AuthController.refreshTokenProfessor);

module.exports = routes;