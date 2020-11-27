const Form = require('../models/Form');

module.exports = {
  async store (req, res) {
    const { form, nameform, aluno, professor } = req.body
    console.log(req.body)
    Form.create({
      form,
      nameform,
      aluno,
      professor
    })
    .then(() => res.status(201).json('Formulario enviado com sucesso!!'))
    .catch(error => {
      res.status(400).json(error)
      console.log(error)
    })
  },

  async getProf (req, res) {
    const { professor } = req.headers
    try {
      const forms = await Form.find({ professor: professor }).populate('aluno');

      res.status(200).json(forms)
    } catch (error) {
      res.status(400).json(error)  
    }
  },

  async getAluno (req, res) {
    const { aluno } = req.headers
    try {
      const forms = await Form.find({ aluno: aluno }).populate('professor');

      res.status(200).json(forms)
    } catch (error) {
      res.status(400).json(error)  
    }
  },
}