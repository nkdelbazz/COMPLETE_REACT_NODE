const express = require('express');  // serve per recuperare express
const router = express.Router(); // serve per creare un nuovo oggetto router 
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const role = require('../middleware/role.js')



//router.get('/', (req,res) => res.send('metodo get')) // è una route che viene generat con il nome del file + '/' 
router.get('/verifyToken', async (req,res) => {
  const bearerHeader = req.headers['authorization']
  if(typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
  }
  else{
    res.send('errore')
  }
  let id_user = '';

  jwt.verify(req.token,process.env.SECRET_TOKEN_KEY,(err,authData) => {
    if(err){
      res.json({token: "token non valido"})
    }
    id_user = authData.user.id
  //  res.json({user:authData.user.id})
  })

  try{
   let user = await User.findById(id_user) 
    res.json({user:user})
  }
  catch(err){
    console.error('not found')
    res.json({err:id_user})
  }
  
})


router.get('/testAuth',auth, (req,res) => {
  
  res.json({token : req.token , user: req.user})

})

// role.admin per andare a testare se ce l'admin mentre staff per vedere se è staff 
router.get('/testRole',auth,role.staff,(req,res) => {
  
  res.json({user: req.user})

})


// REGISTER TOKEN
router.post(
    '/register',
    async (req,res) => {

      console.log(req.body); //
      const {name , email , password} = req.body  // prendi il json e mettilo dentro qui 

      try{
        let user = await User.findOne({email}) // presa da sopra 
        if(user){
           return  res.status(400).json({errors: [{message: 'user esiste già'}]})
        }
        
        user = new User({
            name,
            email,
            password
        })

        //creazione del salt più la password 
        const salt = await bcrypt.genSalt(10)  //viene creato il salt per la password cryptata
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        const payload = {
          user: {
            id: user.id,
            email : user.email,
            role : user.role
          }
        }

        jwt.sign(payload,
                 process.env.SECRET_TOKEN_KEY,
                 {expiresIn: 360000},
                 (err,token) => {
                  if(err) throw err;
                  res.json({token});

                 });

       console.log('user aggiunto')           
      }
      catch(err){
        console.error(err.message);
        res.status(500).send("server error")

      }
    
})


// REGISTER TOKEN
router.post(
  '/login',
  async (req,res) => {

    console.log(req.body); //
    const {name , email , password} = req.body  // prendi il json e mettilo dentro qui 

    try{
      let user = await User.findOne({email}) // presa da sopra 
      if(!user){
         return  res.status(400).json({errors: [{message: 'utente non esistente'}]})
      }
      
      //creazione del salt più la password 
      if (await bcrypt.compare(password, user.password)) {
        // Create token

        const payload = {
          user: {
            id: user.id,
            email : user.email,
            role : user.role
          }
        }

        jwt.sign(payload,
                 process.env.SECRET_TOKEN_KEY,
                 {expiresIn: 360000},
                 (err,token) => {
                  if(err) throw err;
                  res.json({token});

                 });

       }
       else{
           res.status(403).json({err : "password sbagliata"});
       }
      
      }
        catch(err){
          res.status(403).send('password errata ritenta')
        }
  
})


//@ all users only for ADMIN

router.get(
  '/all',
   auth,
   role.admin,
   async (req,res) => {
     try
     {

      let users =  await User.find({role: {$ne: 'admin'}}).exec();
      res.json({todos: users})
      
      if(!users){
        res.status(200).json({msg: 'not users founds'})
      }
      

     }
     catch(err)
     {
       console.error(err.message);
       res.status(500).send("Server error : " + err.message)
     }

})


// serve per cambiare il valore da associare a un altro user 
router.put(
  '/:id',
   auth,
   role.admin,
   async (req,res) => {
     try
     {
     const id = req.params.id
     
     let ArrReqKeys = utility.getAllPathKeys(req.body)  // è lista degli input dati in ingresso 
     let objecUpdate = {};  // è l'oggetto 

      ArrReqKeys.forEach(key => {
      const arrPath = key.split('.');
      const number = arrPath.length;
      const obj = req.body;
      
      let updVal = utility.getNestedObjVal(number,arrPath,obj)
      Object.assign(objecUpdate, { [key]: updVal});  
      });

     // oggetto definito semper come a.b
  
     let upuser =  await User.findOneAndUpdate({
        '_id':id
      },
      objecUpdate
      ).exec(
        function (error, result) {
          console.log('in'); 
          if (!error) {
            console.log('Operation completed successfully: ${result.ok}');
            console.log(result);
          } else {
            console.log('An error occurred: ${error}');
          }
        }
      );
      
       res.json({ArrReqKeys: ArrReqKeys,objecUpdate : objecUpdate})    
     }
     catch(err)
     {
       console.error(err.message);
       res.status(500).send("Server error : " + err.message)
     }
})













module.exports = router; 
