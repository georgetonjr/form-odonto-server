const Aluno = require('../models/Aluno');
const md5 = require('md5');

module.exports = {
  async store (req, res) {
    const { Nome, CPD, Senha } = req.body
    if (await Aluno.findOne({ CPD })){
      return res.status(400).send({error: 'Usuario já registrado!'});
    }
    Aluno.create({
      Nome,
      CPD,
      Senha: md5(Senha)
    })
    .then(() => res.status(201).json('Usuario cadastrado com sucesso!'))
    .catch(error => res.status(400).json(error))
  },
  
  async getUser(req,res){
    const { cpd } = req.headers;
    console.log(req.headers)
    Aluno.findOne({CPD: cpd})
      .then(res => res.json(res.data).status(201))
      .catch(error => res.json(error.message).status(400))    
  },
}