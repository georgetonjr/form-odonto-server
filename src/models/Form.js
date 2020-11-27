const mongoose = require('mongoose');
 

const FormSchema = new mongoose.Schema({
 form: {
   type: Object,
   required: true,
 },

 nameForm: {
   type: String,
   required: true,
 },

 status: {
  type: Boolean,
  default: false,
 },

 aluno: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Aluno'
 },

 professor: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Professor'
 },

 createdAt: {
  type: Date,
  default: Date.now,
},

});
module.exports = mongoose.model('Form', FormSchema);