const express = require('express');  // serve per recuperare express
const router = express.Router(); // serve per creare un nuovo oggetto router 
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Todo = require('../models/Todo')
const CatTodo = require('../models/CatTodo')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
let utility = require('../utility/index.js');
const role = require('../middleware/role.js')

// SERVE PER ANDARE A CREARE UNA NUOVA CATEGORIA CREATA E DEFINITA PER OGNI UTENTE 
router.post(
   '/new',
    auth,
    role.admin,
    async (req,res) => {
      try
      {

       let categoria = new CatTodo({
          name : req.body.name,
          desc : req.body.desc,
          status:{
            user_create: req.user.id
          }
        })

        await categoria.save();
        res.json({auth : req.user,categoria:categoria})
                  
      }
      catch(err)
      {
        console.error(err.message);
        res.status(500).send("server error")
      }

})

// 
router.get(
  '/all',
   auth,
   async (req,res) => {
     try
     {

      let cattodos =  await CatTodo.find({}).exec();
      res.json({cattodos: cattodos})
                 
     }
     catch(err)
     {
       console.error(err.message);
       res.status(500).send("Server error : " + err.message)
     }

})

router.get(
  '/:id',
   auth,
   async (req,res) => {
     try
     {

      const id = req.params.id
      let cattodo = await CatTodo.find({       
        '_id':id}).exec();

      res.json({cattodo: cattodo})
                 
     }
     catch(err)
     {
       console.error(err.message);
       res.status(500).send("Server error : " + err.message)
     }

})


router.delete(
  '/:id',
   auth,
   role.admin,
   async (req,res) => {
     try
     {
      const id = req.params.id
      let cattodo =  await CatTodo.deleteOne({
        '_id':id
      }).exec();
      res.json({cattodo: cattodo})            
     }
     catch(err)
     {
       console.error(err.message);
       res.status(500).send("Server error : " + err.message)
     }
})


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

       let updateCatTodo =  await CatTodo.updateOne({
          '_id':id
        },
        objecUpdate
        ).exec(
          function (error, result) {
            console.log('in'); 
            if (!error) {
              console.log('Operation completed successfully:' + result);
              console.log(result);
            } else {
              console.log('An error occurred:' + error);
            }
          }
        );

        res.json({msg:'categoria trovata ',updateCatTodo : updateCatTodo})

      }
     
     catch(err)
     {
        console.error(err.message);
        res.status(500).send("Server error : " + err.message)
     }
})




module.exports = router; 
