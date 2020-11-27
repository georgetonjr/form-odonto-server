const express = require('express');

const ProfessorController = require('./controllers/ProfessorController');
const AlunoController = require('./controllers/AlunoController');
const AuthController = require('./controllers/AuthController');
const FormController = require('./controllers/FormController');
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

routes.get('/getaluno', AlunoController.getUser);
routes.get('/getprofessor', ProfessorController.getUser);
routes.get('/getallprof', ProfessorController.getAllProf);

routes.post('/form/create', FormController.store);
routes.get('/form/getaluno', FormController.getAluno);
routes.get('/form/getprof', FormController.getProf);
routes.get('/form/getformbyid', FormController.getFormById);

module.exports = routes;