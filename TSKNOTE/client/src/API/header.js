import axios from 'axios';

async function newUser(object){
       
       const user = {
          name: object.name,
          email: object.email,
          password: object.password
        }
    
        try {
          
          const config = {
             headers: {
              'Content-Type': 'application/json',
             }
          }
    
          const body_req = JSON.stringify(user)
          //const res = await axios.post('http://localhost:5000/',body_req,config);
          const res1 = await axios.post('http://localhost:5000/user/register',body_req,config);
    
          console.log(res1.data.token)  // retribuzione del token passato 
          const token = (res1.data.token != '') ?  res1.data.token : '';
    
          if(token){  
            localStorage.setItem("todo_app_token",JSON.stringify(token) )
            console.log(localStorage.getItem('todo_app_token'))
          }
      
        }catch(err){
          console.log(err.response.data)
        }
    
    }


    async function loginUser(object){
      const user = {
         name: object.name,
         email: object.email,
         password: object.password
       }
   
       try {
         
         const config = {
            headers: {
             'Content-Type': 'application/json',
            }
         }
   
         const body_req = JSON.stringify(user)
         //const res = await axios.post('http://localhost:5000/',body_req,config);
         const res1 = await axios.post('http://localhost:5000/user/login',body_req,config);
   
         console.log(res1.data.token)  // retribuzione del token passato 
         const token = (res1.data.token != '') ?  res1.data.token : '';
   
         if(token){  
          localStorage.setItem("todo_app_token",token )
          console.log(localStorage.getItem('todo_app_token'))
          return token
        }
     
       }catch(err){
         console.log(err.response.data)
       }
   
   }



    async function infoUtente() {
      console.log('info utente')
      if(localStorage.getItem('todo_app_token')){
        var token_temp = localStorage.getItem('todo_app_token'); 
        
        token_temp.slice(0, -1);// recupero del token
        console.log('valore del token' + token_temp)
       try {
            
        const config = {
           headers: {
           // 'authorization': 'Beaer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM5MTBmYjZjZDUzYjg5NTBlMmJlNTVkIiwiZW1haWwiOiIzMzMzQGZkZmQuY29tIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNjcwNDUxMTI2LCJleHAiOjE2NzA4MTExMjZ9.-qG20ojNKCnH8xPgsEnLHKsNZA1ByFdelnzs0qKMYJg'
              'authorization': 'Beaer '+token_temp
           }
        }
        //const res = await axios.post('http://localhost:5000/',body_req,config);
        var call = await axios.get('http://localhost:5000/user/testAuth',config);
    
        console.log(call.data)  // retribuzione del token passato 
        console.log('andato a buon fine')
        return call
      }catch(err){
        console.log(err.response.data)
      }
      }
    }


export  {newUser,infoUtente,loginUser};

