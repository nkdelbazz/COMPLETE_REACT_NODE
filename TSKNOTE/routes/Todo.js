const express = require('express');  // serve per recuperare express
const router = express.Router(); // serve per creare un nuovo oggetto router 
const {check, validationResult} = require('express-validator')
const User = require('../models/User')
const Todo = require('../models/Todo')
const auth = require('../middleware/auth')
const CatTodo = require('../models/CatTodo')
let utility = require('../utility/index.js');
const { count } = require('../models/User');

// REGISTER TOKEN
router.post(
   '/new',
    auth,
    async (req,res) => {
      try
      {

       let todo = new Todo({
          name : req.body.name,
          note : req.body.note,
          desc : {
            title : req.body.desc.title,
            descrizione : req.body.desc.descrizione
          },
          status:{
            user: req.user.id
          }
        })

        await todo.save();
        res.json({auth : req.user,todo:todo})
                  
      }
      catch(err)
      {
        console.error(err.message);
        res.status(500).send("server error")
      }

})


router.get(
  '/all',
   auth,
   async (req,res) => {
     try
     {

      let todos =  await Todo.find({ 'status.user': req.user.id}).exec();
      res.json({todos: todos})
                 
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
      let todo = await Todo.find({       
        'status.user': req.user.id,
        '_id':id}).exec();
     // let todo =  await Todo.findById(id).exec();ù

      res.json({todo: todo})
                 
     }
     catch(err)
     {
       console.error(err.message);
       res.status(500).send("Server error : " + err.message)
     }

})


router.delete(
  '/all',
   auth,
   async (req,res) => {
     try
     {
      let todo =  await Todo.deleteMany({'status.user': req.user.id}).exec();
      res.json({todo: todo})            
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
   async (req,res) => {
     try
     {
      const id = req.params.id
      let todo =  await Todo.deleteOne({
        'status.user': req.user.id,
        '_id':id
      }).exec();
      res.json({todo: todo})            
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
  
     let updtodo =  await Todo.findOneAndUpdate({
        'status.user': req.user.id,
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




// **********************************************************************************************
// GESTIONE AGGIUTA DELLA CATEGORIA


router.put(
  '/:id/addcattodo/:idcattodo',
   auth,
   async (req,res) => {
     try
     {
      const id = req.params.id
      const idcattodo = req.params.idcattodo

      // controllo iniziale se esiste la categoria selezionata

      let cattodo =  await CatTodo.findOne({'_id':idcattodo}).exec();
      // cercare se esiste o meno 
      if(cattodo === null){
        res.json({msg:'categoria non trovata '})
      }
      else{
        
          let addCatTodo =  await Todo.updateOne({
            'status.user': req.user.id,
            '_id':id,
            'status.categorie.cat' :{$nin: idcattodo}
          },
          {
            $push:{'status.categorie':{cat:idcattodo}}
          }
          
          ).exec(
            function (error, result) {
              console.log('in'); 
              if (!error) {
                console.log('Operation completed successfully: ${result.ok}');
                console.log(result);
              } else {
                console.log('An error occurred:' + error);
              }
            }
          );

          res.json({msg:'categoria trovata ',cattodo : cattodo})

      }
     }
     catch(err)
     {
        console.error(err.message);
        res.status(500).send("Server error : " + err.message)
     }
})


router.delete(
  '/:id/addcattodo/:idcattodo',
   auth,
   async (req,res) => {
     try
     {
      const id = req.params.id
      const idcattodo = req.params.idcattodo

      // controllo iniziale se esiste la categoria selezionata

      let cattodo =  await CatTodo.findOne({'_id':idcattodo}).exec();
      // cercare se esiste o meno 
      if(cattodo === null){
        res.json({msg:'categoria non trovata '})
      }
      else{
        
          let addCatTodo =  await Todo.deleteOne({
            'status.user': req.user.id,
            '_id':id,
            'status.categorie.cat' :{$in: idcattodo}
          },
          {
            $push:{'status.categorie':{cat:idcattodo}}
          }
          
          ).exec(
            function (error, result) {
              console.log('in'); 
              if (!error) {
                console.log('Operation completed successfully: ${result.ok}');
                console.log(result);
              } else {
                console.log('An error occurred:' + error);
              }
            }
          );

          res.json({msg:'categoria trovata ',cattodo : cattodo})

      }
     }
     catch(err)
     {
        console.error(err.message);
        res.status(500).send("Server error : " + err.message)
     }
})




// ******************************************************************************************************



module.exports = router; 
