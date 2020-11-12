const mongoose = require('mongoose');
 

const ProfessorSchema = new mongoose.Schema({
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
  },

  active: {
    type: Boolean,
    required: true,
    default: true,
  },
});
module.exports = mongoose.model('Professor', ProfessorSchema);