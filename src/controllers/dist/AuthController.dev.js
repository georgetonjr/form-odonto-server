"use strict";

var Professor = require('../models/Professor');

var Aluno = require('../models/Aluno');

var AuthService = require('../functions/auth');

var md5 = require('md5');

module.exports = {
  LoginProfessor: function LoginProfessor(req, res) {
    var _req$body, CPD, Senha, professor, token;

    return regeneratorRuntime.async(function LoginProfessor$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, CPD = _req$body.CPD, Senha = _req$body.Senha;
            _context.prev = 1;
            _context.next = 4;
            return regeneratorRuntime.awrap(Professor.findOne({
              CPD: CPD
            }).select('+senha'));

          case 4:
            professor = _context.sent;

            if (professor) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).json({
              error: 'User not found'
            }));

          case 7:
            if (!(md5(Senha) !== professor.senha)) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(401).json({
              error: 'Invalid Password'
            }));

          case 9:
            if (!professor) {
              _context.next = 16;
              break;
            }

            _context.next = 12;
            return regeneratorRuntime.awrap(AuthService.generateToken({
              id: professor._id,
              CPD: professor.CPD,
              Id: professor._id
            }));

          case 12:
            token = _context.sent;
            res.status(201).json({
              token: token,
              Nome: professor.Nome,
              Id: professor._id
            });
            _context.next = 17;
            break;

          case 16:
            res.status(401).json({
              message: 'Por favor tente novamente mais tarde!!'
            });

          case 17:
            _context.next = 22;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);
            console.error(_context.t0);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 19]]);
  },
  LoginAluno: function LoginAluno(req, res) {
    var _req$body2, CPD, Senha, aluno, token;

    return regeneratorRuntime.async(function LoginAluno$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, CPD = _req$body2.CPD, Senha = _req$body2.Senha;
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Aluno.findOne({
              CPD: CPD
            }).select('+senha'));

          case 4:
            aluno = _context2.sent;

            if (aluno) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).json({
              error: 'User not found'
            }));

          case 7:
            if (!(md5(Senha) !== aluno.senha)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(401).json({
              error: 'Invalid Password'
            }));

          case 9:
            if (!aluno) {
              _context2.next = 16;
              break;
            }

            _context2.next = 12;
            return regeneratorRuntime.awrap(AuthService.generateToken({
              id: aluno._id,
              CPD: aluno.CPD,
              Id: aluno._id
            }));

          case 12:
            token = _context2.sent;
            res.status(201).json({
              token: token,
              Nome: aluno.Nome,
              Id: aluno._id
            });
            _context2.next = 17;
            break;

          case 16:
            res.status(401).json({
              message: 'Por favor tente novamente mais tarde!!'
            });

          case 17:
            _context2.next = 22;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](1);
            console.error(_context2.t0);

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 19]]);
  },
  refreshTokenAluno: function refreshTokenAluno(req, res, next) {
    var token, data, aluno, tokenData;
    return regeneratorRuntime.async(function refreshTokenAluno$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            token = req.body.token || req.query.token || req.headers['x-access-token'];
            _context3.next = 4;
            return regeneratorRuntime.awrap(AuthService.decodeToken(token));

          case 4:
            data = _context3.sent;
            _context3.next = 7;
            return regeneratorRuntime.awrap(Aluno.findById({
              _id: data.id
            }));

          case 7:
            aluno = _context3.sent;

            if (aluno) {
              _context3.next = 11;
              break;
            }

            res.status(404).send({
              message: 'Cliente não encontrado'
            });
            return _context3.abrupt("return");

          case 11:
            _context3.next = 13;
            return regeneratorRuntime.awrap(AuthService.generateToken({
              id: aluno._id,
              email: aluno.email,
              name: aluno.name
            }));

          case 13:
            tokenData = _context3.sent;
            res.status(201).send({
              token: token,
              data: {
                Nome: aluno.Nome,
                Id: aluno._id
              }
            });
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](0);
            res.status(500).send({
              message: 'Falha ao processar sua requisição'
            });

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 17]]);
  },
  refreshTokenProfessor: function refreshTokenProfessor(req, res, next) {
    var token, data, professor, tokenData;
    return regeneratorRuntime.async(function refreshTokenProfessor$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            token = req.body.token || req.query.token || req.headers['x-access-token'];
            _context4.next = 4;
            return regeneratorRuntime.awrap(AuthService.decodeToken(token));

          case 4:
            data = _context4.sent;
            _context4.next = 7;
            return regeneratorRuntime.awrap(Professor.findById({
              _id: data.id
            }));

          case 7:
            professor = _context4.sent;

            if (professor) {
              _context4.next = 11;
              break;
            }

            res.status(404).send({
              message: 'Cliente não encontrado'
            });
            return _context4.abrupt("return");

          case 11:
            _context4.next = 13;
            return regeneratorRuntime.awrap(AuthService.generateToken({
              id: professor._id,
              email: professor.email,
              name: professor.name
            }));

          case 13:
            tokenData = _context4.sent;
            res.status(201).send({
              token: token,
              data: {
                Nome: professor.Nome,
                Id: professor._id
              }
            });
            _context4.next = 20;
            break;

          case 17:
            _context4.prev = 17;
            _context4.t0 = _context4["catch"](0);
            res.status(500).send({
              message: 'Falha ao processar sua requisição'
            });

          case 20:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 17]]);
  }
};