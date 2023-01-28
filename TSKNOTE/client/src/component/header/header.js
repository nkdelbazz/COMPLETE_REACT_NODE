/* eslint-disable react/jsx-pascal-case */
import styles from'./header.module.css';
import React from 'react';
import Hmodal from './Hmodal';
//import Header_Modal from './modal/header_modal'
import { useState,useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import { useSelector,useDispatch } from 'react-redux';
import { updateState,removeState } from '../../storeRedux/userSlice';
import {infoUtente} from '../../API/header';


function Header() {

  const infoUser = require('../../images/header/userLogo.png')
  const infoUserOver = require('../../images/header/userLogoInfo.png')

  const  [modal,setModal] = useState(false) // serve per andare a settare il modale 
  const  [nameModal,setNameModal] = useState('')
  const  [message,setMessage] = useState('')
  const  [imageinfoUser,setimageinfoUser] = useState(infoUser)
  const  [objectInfoUtente,setobjectInfoUtente] = useState(null)

  const user = useSelector(store => store.user) // serve per valorizzare l' utetne attivo
  const dispatch = useDispatch()


function Logout(e){
  e.preventDefault();
  ModalButtonHandler(e)
  // rimozione del token : 
  localStorage.removeItem('todo_app_token')
  dispatch(removeState())
   
}  


function getinfoUtente(e){
  infoUtente()
  console.log('ok')
}  



function ModalButtonHandler(e)
{
  e.preventDefault();
 let value =  e.target.id
 setNameModal(e.target.id)
 setModal(true)
 console.log(value + '----' + modal)
}

function closeModal(value){
  setMessage('chiuso')
  setModal(false)

}


useEffect((event) => {
  if(user.token != '' && user.token != null){
    /*
    obj = {
      name: 
    }
    */
   console.log('valore dell utente : ' + user.token)
   var  obj = '';
    setobjectInfoUtente(obj)
  }
}, [user])


  return (
    <React.Fragment>
     <div className={styles.header_flex_container}>
      <div className={styles.header_flex_container_left_side}>
        <div id="Hcategories"    onClick={e => ModalButtonHandler(e)}>
          categories
        </div>
        <div id="Hfavorite"      onClick={e => ModalButtonHandler(e)}>
          favorite
        </div>
        <div  className={styles.Hadd} id="Hadd" onClick={e => ModalButtonHandler(e)}>
          add
        </div>
        <div id="Hremove" className={styles.Hremove} onClick={e => ModalButtonHandler(e)}>
          remove
        </div>
      </div>
      <div className={styles.header_flex_container_right_side}>


      {(user.token != '' && user.token != null) ? (
        <React.Fragment>
          <div id="Hlogout" className={styles.Hlogout} onClick={e => Logout(e)}>
            LOGOUT
          </div>
          <table style={{width:'400px'}}>
            <tr>
              <td width={'10%'} align={'left'} style={{verticalAlign:'center'}} onClick={e => getinfoUtente(e)}>
                <img className={styles.ImageInfoUser} style={{height:'45px',cursor:'pointer'}} alt='infoUtente' 
                     src={imageinfoUser}
                     onMouseOver={() => setimageinfoUser(infoUserOver)}
                     onMouseOut={() => setimageinfoUser(infoUser)}
                />
              </td>
              <td width={'35%'} align={'left'} style={{verticalAlign:'center'}}><strong>UTENTE:</strong><br></br><strong>ROLE:</strong></td>
              <td></td>
              <td width={'55%'} align={'left'} style={{verticalAlign:'center'}}>{user.token.user.email}<br></br>{user.token.user.role}</td>
              <td width={'5%'}></td>
            </tr>
        </table>      
        </React.Fragment>

                ) : (
        <React.Fragment> 
          <div id="Hregister" className={styles.Hregister} onClick={e => ModalButtonHandler(e)}>
            REGISTER
          </div>
          <div id="Hlogin" className={styles.Hlogin} onClick={e => ModalButtonHandler(e)}>
            LOGIN
          </div>         
        </React.Fragment>    

                )}
      </div>
     </div>

     {modal === true &&
     <div>
       {message}
        <h2 style={{color:'red'}}>
          You have opened this modal :  {nameModal}.
        </h2>
        <Hmodal
         nameModal = {nameModal}
         closeModal = {closeModal}
         />
     </div>
      }

  </React.Fragment>

  );
}

export default Header;



/*
          <div id="Hlogout" className={styles.Hlogout} onClick={e => Logout(e)}>
            LOGOUT
          </div>
*/