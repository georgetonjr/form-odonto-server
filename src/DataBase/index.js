const mongoose = require('mongoose');
require('dotenv/config');

const connect = () => {
  mongoose
    .connect(`mongodb+srv://${process.env.DBUser}:${process.env.Password}@cluster0.84aem.mongodb.net/${process.env.DBName}?retryWrites=true&w=majority`, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true, 
    })
    .then(console.log('conectado com sucesso'))
    .catch(e => console.log(e))
};

exports.connect = connect;