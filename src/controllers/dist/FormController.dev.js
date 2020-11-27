"use strict";

var Form = require('../models/Form');

module.exports = {
  store: function store(req, res) {
    var _req$body, form, nameform, aluno, professor;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, form = _req$body.form, nameform = _req$body.nameform, aluno = _req$body.aluno, professor = _req$body.professor;
            console.log(req.body);
            Form.create({
              form: form,
              nameForm: nameform,
              aluno: aluno,
              professor: professor
            }).then(function () {
              return res.status(201).json('Formulario enviado com sucesso!!');
            })["catch"](function (error) {
              res.status(400).json(error.message);
              console.log(error.message);
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    });
  },
  getProf: function getProf(req, res) {
    var professor, forms;
    return regeneratorRuntime.async(function getProf$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            professor = req.headers.professor;
            _context2.prev = 1;
            _context2.next = 4;
            return regeneratorRuntime.awrap(Form.find({
              professor: professor
            }).populate('aluno'));

          case 4:
            forms = _context2.sent;
            res.status(200).json(forms);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            res.status(400).json(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[1, 8]]);
  },
  getAluno: function getAluno(req, res) {
    var aluno, forms;
    return regeneratorRuntime.async(function getAluno$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            aluno = req.headers.aluno;
            _context3.prev = 1;
            _context3.next = 4;
            return regeneratorRuntime.awrap(Form.find({
              aluno: aluno
            }).populate('professor'));

          case 4:
            forms = _context3.sent;
            res.status(200).json(forms);
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            res.status(400).json(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 8]]);
  },
  getFormById: function getFormById(req, res) {
    var id, form;
    return regeneratorRuntime.async(function getFormById$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.headers.id;
            _context4.prev = 1;
            _context4.next = 4;
            return regeneratorRuntime.awrap(Form.findOne({
              _id: id
            }).populate('aluno'));

          case 4:
            form = _context4.sent;
            console.log(form);
            res.status(200).json(form);
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);
            res.status(400).json(_context4.t0);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[1, 9]]);
  }
};