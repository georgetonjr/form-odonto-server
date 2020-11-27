const Form = require('../models/Form');

module.exports = {
  async store (req, res) {
    const { form, nameform, aluno, professor } = req.body
    console.log(req.body)
    Form.create({
      form,
      nameForm: nameform,
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
      console.log(req.headers)
      const forms = await Form.find({ aluno: aluno }).populate('professor');
      console.log(forms)
      res.status(200).json(forms)
    } catch (error) {
      res.status(400).json(error)  
    }
  },

  async getFormById(req, res){
    const { id } = req.headers

    try {
      const form = await Form.findOne({ _id: id }).populate('aluno');
      console.log(form)
      res.status(200).json(form)
    } catch (error) {
      res.status(400).json(error)  
    }
  },

  async changeFormStatus(req, res){
    try {
      const {id, status, obs} = req.body
      console.log(req.body)
      const form =  await Form.findOne({ _id: id });
      form.obs = obs;
      form.status = status;
      form.save()
      console.log(form)
      res.status(200).json(form)
    } catch (error) {
      console.log(error)
      res.status(400).json(error)  
    }
  },

}