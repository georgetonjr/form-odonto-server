const Professor = require('../models/Professor');
const Aluno = require('../models/Aluno');
const AuthService = require('../functions/auth');
const md5 = require('md5');

module.exports = {
  async LoginProfessor(req, res){
    const { CPD, Senha} = req.body;
    try {
      const professor = await Professor.findOne({ CPD }).select('+senha');

      if (!professor)
        return res.status(400).json({ error: 'User not found'});

      if(md5(Senha) !== professor.senha)
        return res.status(401).json({error: 'Invalid Password'});

      if(professor){
        const token = await AuthService.generateToken({
          id: professor._id,
          CPD: professor.CPD,
          Id: professor._id,
        });
        res.status(201).json({
          token: token,
          Nome: professor.Nome,
          Id: professor._id,
        });
      }
      else {
        res.status(401).json({message: 'Por favor tente novamente mais tarde!!'});
      }
    } catch (error) {
      console.error(error);
    }
  },

  async LoginAluno(req, res){
    const { CPD, Senha} = req.body;
    try {
      const aluno = await Aluno.findOne({ CPD }).select('+senha');

      if (!aluno)
        return res.status(400).json({ error: 'User not found'});

      if(md5(Senha) !== aluno.senha)
        return res.status(401).json({error: 'Invalid Password'});

      if(aluno){
        const token = await AuthService.generateToken({
          id: aluno._id,
          CPD: aluno.CPD,
          Id: aluno._id,
        });
        res.status(201).json({
          token: token,
          Nome: aluno.Nome,
          Id: aluno._id
        });
      }
      else {
        res.status(401).json({message: 'Por favor tente novamente mais tarde!!'});
      }
    } catch (error) {
      console.error(error);
    }
  },

  async refreshTokenAluno (req, res, next){
    try {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const data = await AuthService.decodeToken(token);
    
      const aluno = await Aluno.findById({_id: data.id});

      if (!aluno) {
          res.status(404).send({
            message: 'Cliente não encontrado'
          });
          return;
      }

      const tokenData = await AuthService.generateToken({
          id: aluno._id,
          email: aluno.email,
          name: aluno.name,
      });

      res.status(201).send({
          token: token,
          data: {
            Nome: aluno.Nome,
            Id: aluno._id,
              
          }
      });
    } catch (e) {
      res.status(500).send({
          message: 'Falha ao processar sua requisição'
      });
    }
  },

  async refreshTokenProfessor (req, res, next){
    try {
      const token = req.body.token || req.query.token || req.headers['x-access-token'];
      const data = await AuthService.decodeToken(token);

      const professor = await Professor.findById({ _id: data.id });

      if (!professor) {
          res.status(404).send({
              message: 'Cliente não encontrado'
          });
          return;
      }

      const tokenData = await AuthService.generateToken({
          id: professor._id,
          email: professor.email,
          name: professor.name,
      });

      res.status(201).send({
          token: token,
          data: {
            Nome: professor.Nome,
            Id: professor._id,
          }
      });
    } catch (e) {
      res.status(500).send({
          message: 'Falha ao processar sua requisição'
      });
    }
  }

}