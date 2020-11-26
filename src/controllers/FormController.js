const Form = require('../models/Form');

module.exports = {
  async store (req, res) {
    const { form, nameForm } = req.body

    Form.create({
      form,
      nameForm,
    })
    .then(() => res.status(201).json('Formulario enviado com sucesso!!'))
    .catch(error => res.status(400).json(error))
  },
}