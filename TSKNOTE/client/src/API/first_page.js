import axios from 'axios';

async function AllTodo() {
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
      var call = await axios.get('http://localhost:5000/todo/all',config);
  
      console.log(call.data)  // retribuzione del token passato 
      console.log('andato a buon fine')
      return call
    }catch(err){
      console.log(err.response.data)
    }
    }
  }


  export  {AllTodo};