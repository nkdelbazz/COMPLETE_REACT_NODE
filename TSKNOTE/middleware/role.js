

 
 function getAdmin(req,res,next) {
  if(req.user.role == 'admin'){
    next()
  }
  else{
    res.status(403).send('not autorized')  
  }

 }

 function getStaff(req,res,next) {

  if(req.user.role == 'staff' || req.user.role == 'admin'){
    next()
  }
  else{
    res.status(403).send('not autorized')  
  }

 }



 module.exports = {
    admin : getAdmin,
    staff : getStaff
 };