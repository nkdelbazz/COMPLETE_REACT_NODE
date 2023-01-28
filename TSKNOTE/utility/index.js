"use strict";

let getAllPathKeys = 
 function getAllPathKeys(object) {
   function iter(o, p) {
      if (o && typeof o === 'object') {
          Object.keys(o).forEach(function (k) {
              iter(o[k], p.concat(k));
          });
          return;
      }
      path[p.join('.')] = o;
  }
  var path = {};
  iter(object, []);
  return Object.keys(path);
 }


// ritorna il valore della request in base al percorso

// number is a number of a nested key 
// arrPath is a path og a key into a object
 let getNestedObjVal =  
 function getNestedObjVal(number,arrPath,obj) {
   switch (number) {
      case 1:
        return obj[arrPath[0]]
        break;
      case 2:
         return obj[arrPath[0]][arrPath[1]]
         break;
      case 3:
         return obj[arrPath[0]][arrPath[1]][arrPath[2]]
         break;
      case 4:
         return obj[arrPath[0]][arrPath[1]][arrPath[2]][arrPath[3]]
         break;
      case 5:
         return obj[arrPath[0]][arrPath[1]][arrPath[3]][arrPath[4]][arrPath[5]]
         break;
      default:
         return obj[arrPath[0]];
    }  
 }



 module.exports = {
    getAllPathKeys : getAllPathKeys,
    getNestedObjVal : getNestedObjVal
 };