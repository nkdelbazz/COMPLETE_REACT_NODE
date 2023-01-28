import './App.css';
import Header from './component/header/header'
import First_page from './component/body/first_page';
import $ from 'jquery';
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {updateState,removeState} from './storeRedux/userSlice'

function App() {
  // per accedere all utente : 
  const user = useSelector(store => store.user)
  const dispatch = useDispatch()


  console.log(user)
  //console.log(JSON.parse(localStorage.getItem('todo_app_token')))
  return (
<React.Fragment>
  <Header/>
  <div style={{display : 'none'}}>
    <button onClick={() => dispatch(updateState('token_personale'))}>Update the status</button>  
    <button onClick={() => dispatch(removeState())}>Remove the status</button>
    <button onClick={() => dispatch(removeState())}>Remove the status</button>
  </div>
  <First_page></First_page>

</React.Fragment>
  );
}

export default App;
