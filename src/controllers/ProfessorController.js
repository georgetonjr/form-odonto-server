const Professor = require('../models/Professor');
const md5 = require('md5');

module.exports = {
  async store (req, res) {
    const { Nome, CPD, Senha } = req.body
    if (await Professor.findOne({ CPD })){
      return res.status(400).send({error: 'Usuario já registrado!'});
    }
    Professor.create({
      Nome,
      CPD,
      Senha: md5(Senha),
    })
    .then(() => res.status(201).json('Usuario cadastrado com sucesso!'))
    .catch(error => res.status(400).json(error))
  },

  async getUser(req,res){
    try {
      const { cpd } = req.headers;
      const user = await Professor.findOne({CPD: cpd})

      return res.json(user).status(200)
    } catch (error) {
      res.json(error).status(400)
    }
  },

  async getAllProf(req, res){
    try {
      const professores = await Professor.find()
      return res.json(professores).status(200)
    } catch (error) {
      res.json(error).status(400) 
    }
  },
}