const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if(typeof bearerHeader !== 'undefined'){
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      
      try {
        const decoded = jwt.verify(req.token,process.env.SECRET_TOKEN_KEY) // verificami se il token ha la stringa 
        req.user = decoded.user 
        next();
        } 
      catch(err){
          res.status(401).json({msg:'Token not valid'})
        }
        }
        else{
        res.send('non autenticato')
        }
};