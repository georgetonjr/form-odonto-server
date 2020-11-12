const jwt = require('jsonwebtoken');

module.exports = {
  async generateToken(data){
    return jwt.sign(data, process.env.SALT_KEY, { expiresIn: '1d'});
  },

  async decodeToken(token){
    let data = await jwt.verify(token, process.env.SALT_KEY);
    return data;
  },

  async authorize(req, res, next){
    let token = req.body.token || req.query.token;

    if(!token){
      res.status(401).json({message: "Token inválido"});
    }
    else{
      next();
    }
  },
} 