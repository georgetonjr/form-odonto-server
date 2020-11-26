"use strict";

var Form = require('../models/Form');

module.exports = {
  store: function store(req, res) {
    var _req$body, form, nameForm;

    return regeneratorRuntime.async(function store$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, form = _req$body.form, nameForm = _req$body.nameForm;
            Form.create({
              form: form,
              nameForm: nameForm
            }).then(function () {
              return res.status(201).json('Formulario enviado com sucesso!!');
            })["catch"](function (error) {
              return res.status(400).json(error);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  }
};