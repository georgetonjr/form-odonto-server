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
    const { CPD } = req.headers;
    Professor.findOne({CPD})
    .then(res => res.status(201).json(res.data))
    .catch(error => res.status(400).json(error))    
  },
}