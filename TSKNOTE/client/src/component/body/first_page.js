/* eslint-disable react/jsx-pascal-case */
import styles from'./first_page.module.css';
import React from 'react';
//import Header_Modal from './modal/header_modal'
import { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import { useSelector,useDispatch } from 'react-redux';
import { updateState,removeState } from '../../storeRedux/userSlice';
import {infoUtente} from '../../API/header';
import {AllTodo} from '../../API/first_page';


function Firs_page() {

  $(document).ready(function(){
    $("#arrup").mouseover(function(){
        $("#arrup").css("color", "red");
    });
  });

function TaskSectionNone(e){
  if(displayTask == styles.taskSection){
    setdisplayTask(styles.taskSectionNone)
    setarrowUp(styles.arrowDown);
  }
  if(displayTask == styles.taskSectionNone){
    setdisplayTask(styles.taskSection)
    setarrowUp(styles.arrowUp);
  }


 
}

  const  [modal,setModal] = useState(false) // serve per andare a settare il modale  displayTask
  const  [displayTask,setdisplayTask] = useState(styles.taskSection) 
  const  [arrowUp,setarrowUp] = useState(styles.arrowUp)
  const  [todos,setTodos] = useState({})
  const  [click,setClick] = useState(0);

  const user = useSelector(store => store.user) // serve per valorizzare l' utetne attivo
  const dispatch = useDispatch()


  const getAllTodos = async () =>{
    try {
      const response = await AllTodo() 
      setTodos(response.data)
      } catch (error) {
          console.log(error);
      }
};

function clickTest(e){
  setClick(click + 1)
}

useEffect (() => {
  getAllTodos()
  console.log('valore dei ' + JSON.stringify(todos))
  console.dir(todos) // per i json 
},[click])


useEffect((event) => {
  if(user.token != '' && user.token != null){
   console.log('valore dell utente : ' + user.token)
   var  obj = '';
  }
}, [user])


const freccia_su = (

  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 21 21" fill="none">
  <g>
      <circle cx="10.5" cy="10.5" r="10.5" fill="#24BF7E" fill-opacity="0.47"/>
      <path d="M10.3301 17.5061L6.01059 10L10.3365 13.0061L14.6708 10.0122L10.3301 17.5061Z" fill="#082C4E"/>
      <path d="M10.3301 11.5061L6.01059 4L10.3365 7.00611L14.6708 4.01223L10.3301 11.5061Z" fill="#082C4E"/>
      </g>
  </svg>
);

  return (
  <React.Fragment>
   <section >
    <div className={styles.Title_taskSection}>
       <div>TUTTI I TASK</div>
       <div id='arrup' className={arrowUp} onClick={e => TaskSectionNone(e)}>{freccia_su}</div> 
    </div>
   <ul className={displayTask}>
        <li id='taskSection' >item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>
        <li>item</li>  
    </ul>
    <div className={styles.TaskSectionButton}>
       <button className={styles.attivi}>attivi</button>
       <button className={styles.non_attivi}>non attivi</button>
       <button className={styles.fatti}>fatti</button>
    </div>
   </section>

   <button onClick={e => clickTest(e)}> clickTest</button>  
  </React.Fragment>

  );
}



export default Firs_page;


