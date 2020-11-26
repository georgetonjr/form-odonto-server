const mongoose = require('mongoose');
 

const AlunoSchema = new mongoose.Schema({
  Nome: {
    type: String,
    required: true,
  },

  CPD: {
    type: String,
    unique: true,
    required: true,
  },

  Senha: {
    type: String,
    required: true,
    select: false,
  },

  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});
module.exports = mongoose.model('Aluno', AlunoSchema);