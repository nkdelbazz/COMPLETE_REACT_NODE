/* eslint-disable react/jsx-pascal-case */
import React from 'react';
//import Header_Modal from './modal/header_modal'
import { useState,useEffect } from 'react';
import styles from './Hmodal.module.css';
import {newUser,infoUtente,loginUser} from '../../API/header';
import { useSelector,useDispatch } from 'react-redux';
import {updateState,removeState} from '../../storeRedux/userSlice';

function Hmodal(props) {

  const userSlice = useSelector(store => store.user) // serve per valorizzare l' utetne attivo
  const dispatch = useDispatch()

  // GESTIONE PER REGISTER E PER IL LOGIN 
  /*

  */

 const validEmail = new RegExp(
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
 );
  const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');


  const [inputName,setInputName]   = useState(null)
  const [inputEmail,setInputEmail] = useState(null)
  const [inputPass,setInputPass]   = useState(null)

  const [inputNameErr,setInputNameErr]   = useState('')
  const [inputEmailErr,setInputEmailErr] = useState('')
  const [inputPassErr,setInputPassErr]   = useState('')

  const [validInput,setValidInput] = useState('styles.Hregister_submit_blocked')


  // lsita di tutti i modali da definire 
  const handleInputs = event => {
    var valore = event.target.value;
    var id = event.target.id;
    switch (id) {
        case 'inputName':
          setInputName(valore)
          console.log('inputName:', event.target.value);
        break;
        // *************************
        case 'inputEmail':
          setInputEmail(valore)
          console.log('inputEmail:', event.target.value);
        break;
        // *************************
        case 'inputPass':
          setInputPass(valore)
          console.log('inputPass:', event.target.value);
        break;
      default:
        console.log(`nessun dato`);
    }
  };


  useEffect((event) => {
    const timer = setTimeout(() => {
      if(inputName){
        var erroreName = '';
        if(((inputName.trim()).length) < 10){
          erroreName = (<span style={{color:'#650b0b9c',fontFamily:'fantasy'}}>nome non consentito</span>);
        }
        HandleInputError('inputName',erroreName)
       // RegHandleError('regName',text)
      }
      if(inputEmail){
        var erroreEmail = '';
        if(((inputEmail.trim()).length) < 10 || !(validEmail.test(inputEmail.trim()))){
          erroreEmail = (<span style={{color:'#650b0b9c',fontFamily:'fantasy'}}>email non consentita</span>);
        }
        HandleInputError('inputEmail',erroreEmail)
      //   RegHandleError('regEmail',text)
      }
      if(inputPass){
        var errorePass = '';
        if(((inputPass.trim()).length) < 10 || !(validPassword.test(inputPass.trim()))){
          errorePass = (<span style={{color:'#650b0b9c',fontFamily:'fantasy'}}>password non consentita</span>);
        }
        HandleInputError('inputPass',errorePass)
      //  RegHandleError('regPass',text)
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [inputName,inputEmail,inputPass])


  function HandleInputError(id,text){
    switch (id) {
      case 'inputName':
        setInputNameErr(text)
        console.log(`errore` + inputNameErr);
      break;
      // *************************
      case 'inputEmail':
        setInputEmailErr(text)
        console.log(`errore` + inputEmailErr);
      break;
      // *************************
      case 'inputPass':
        setInputPassErr(text)
        console.log(`errore` + inputPassErr);
      break;
    default:
      console.log(`nessun dato`);
  }

  }


  function HandleInputButtonHover(e){
    e.preventDefault();
    console.log(inputName.length )
    console.log(inputEmail.length)
    console.log(inputPass.length )
    if(
      (inputName.length )  > 0 &&
      (inputEmail.length) > 0 &&
      (inputPass.length )  > 0  &&
      (inputNameErr.length  <= 0 ) &&
      (inputEmailErr.length  <= 0  ) &&
      (inputPassErr.length  <= 0  ) 
      ){
        setValidInput(true)
      }
      else{
        setValidInput(false)
      }
      e.preventDefault();
  }

  function registerSubmit(e){
    const obj = {
      name : inputName,
      email : inputEmail,
      password : inputPass
    }
    newUser(obj)
    props.closeModal()
  }

  async function loginSubmit(e){
    const obj = {
      name : inputName,
      email : inputEmail,
      password : inputPass
    }
    try {
      const user = await loginUser(obj);
      const response = await infoUtente() 
      dispatch(updateState(response.data))
      } catch (error) {
          console.log(error);
      }
      
    props.closeModal()
  }
  




  let defaultModal = (
    <React.Fragment>
    <div>ok aperto il valore definito come {props.nameModal}</div>

    <div className={styles.header_modal_container}>
      <div className={styles.modal_not_avaible} style={{cursor:'pointer'}} onClick={() => props.closeModal()}>  
        <table width={'100%'} height={'100%'}>
            <tr width={'100%'} className={styles.not_available}>
            <td width={'100%'} align={'center'}>( 404 )<br/>SEZIONE NON DISPONIBILE per fare le modifiche necessarie</td>
            </tr>
        </table>
      </div>
    </div>
  </React.Fragment>
  );


  let riga_spazio_hregister = (
    <tr width={'100%'} >
    <td width={'5%'}  style={{height:'20px'}}></td>
    <td width={'30%'} style={{height:'20px'}}></td>
    <td width={'60%'} style={{height:'20px'}}></td>
    <td width={'5%'}  style={{height:'20px'}}></td>
  </tr>
  )

  let Hregister = (
    <React.Fragment>
    <div>ok aperto il valore definito come {props.nameModal}</div>

    <div className={styles.header_modal_container}>
      <div className={styles.Hregister} style={{cursor:'pointer'}}>  
        <table width={'100%'}>
            <tr width={'100%'} className={styles.Hregister_titolo} >
              <td width={'90%'} align={'center'}>REGISTER</td>
              <td width={'10%'} className={styles.Hregister_close} onClick={() => props.closeModal()} align={'center'}>X</td>
            </tr>
        </table>
        <table width={'100%'}>
           {riga_spazio_hregister}
            <tr width={'100%'} className={styles.Hregister_riga} >
              <td width={'5%'} ></td>
              <td width={'30%'}>Name</td>
              <td width={'60%'}>
              <input id={'inputName'}
                className={styles.h_input}
                onChange={handleInputs}
                value={inputName}
                >
              </input>
              </td>
              <td width={'5%'} align={'center'}></td>
            </tr>
            <tr width={'100%'} >
              <td width={'5%'}  style={{height:'30px'}}></td>
              <td width={'30%'} style={{height:'30px'}}></td>
              <td width={'60%'} style={{height:'30px'}}>{inputNameErr}</td>
              <td width={'5%'}  style={{height:'30px'}}></td>
            </tr>
            <tr width={'100%'} className={styles.Hregister_riga} >
              <td width={'5%'} ></td>
              <td width={'30%'}>Email</td>
              <td width={'60%'}>
              <input id={'inputEmail'}
                className={styles.h_input}
                onChange={handleInputs}
                value={inputEmail}
                >
              </input>
              </td>
              <td width={'5%'} align={'center'}></td>
            </tr>
            <tr width={'100%'} >
              <td width={'5%'}  style={{height:'30px'}}></td>
              <td width={'30%'} style={{height:'30px'}}></td>
              <td width={'60%'} style={{height:'30px'}}>{inputEmailErr}</td>
              <td width={'5%'}  style={{height:'30px'}}></td>
            </tr>
            <tr width={'100%'} className={styles.Hregister_riga} >
              <td width={'5%'} ></td>
              <td width={'30%'}>Password</td>
              <td width={'60%'}>
              <input id={'inputPass'}
                className={styles.h_input}
                onChange={handleInputs}
                value={inputPass}
                >
              </input>
              </td>
              <td width={'5%'} align={'center'}></td>
            </tr>
            <tr width={'100%'} >
              <td width={'5%'}  style={{height:'30px'}}></td>
              <td width={'30%'} style={{height:'30px'}}></td>
              <td width={'60%'} style={{height:'30px'}}>{inputPassErr}</td>
              <td width={'5%'}  style={{height:'30px'}}></td>
            </tr>
        </table>
        <table width={'100%'}>
            <tr>
              <td width={'10%'}></td>
              <td width={'80%'} align={'center'}></td>
              <td width={'10%'}></td>
            </tr>
            <tr>
              <td width={'10%'}></td>
              <td width={'80%'} align={'center'} onMouseEnter={(e) => {HandleInputButtonHover(e)}}>
                {validInput === true ? (
                  <div 
                  className={styles.Hregister_submit} 
                  onClick={(e) => {registerSubmit()}}
                >SUBMIT</div>
                ) : (
                  <div 
                  className={styles.Hregister_submit_blocked} 
                >SUBMIT</div>
                )}
                </td>
              <td width={'10%'}></td>
            </tr>
        </table>   
      </div>
    </div>
  </React.Fragment>
  );

  let Hlogin = (
    <React.Fragment>
    <div>ok aperto il valore definito come {props.nameModal}</div>

    <div className={styles.header_modal_container}>
      <div className={styles.Hregister} style={{cursor:'pointer'}}>  
        <table width={'100%'}>
            <tr width={'100%'} className={styles.Hregister_titolo} >
              <td width={'90%'} align={'center'}>LOGIN</td>
              <td width={'10%'} className={styles.Hregister_close} onClick={() => props.closeModal()} align={'center'}>X</td>
            </tr>
        </table>
        <table width={'100%'}>
           {riga_spazio_hregister}
            <tr width={'100%'} className={styles.Hregister_riga} >
              <td width={'5%'} ></td>
              <td width={'30%'}>Name</td>
              <td width={'60%'}>
              <input id={'inputName'}
                className={styles.h_input}
                onChange={handleInputs}
                value={inputName}
                >
              </input>
              </td>
              <td width={'5%'} align={'center'}></td>
            </tr>
            <tr width={'100%'} >
              <td width={'5%'}  style={{height:'30px'}}></td>
              <td width={'30%'} style={{height:'30px'}}></td>
              <td width={'60%'} style={{height:'30px'}}>{inputNameErr}</td>
              <td width={'5%'}  style={{height:'30px'}}></td>
            </tr>
            <tr width={'100%'} className={styles.Hregister_riga} >
              <td width={'5%'} ></td>
              <td width={'30%'}>Email</td>
              <td width={'60%'}>
              <input id={'inputEmail'}
                className={styles.h_input}
                onChange={handleInputs}
                value={inputEmail}
                >
              </input>
              </td>
              <td width={'5%'} align={'center'}></td>
            </tr>
            <tr width={'100%'} >
              <td width={'5%'}  style={{height:'30px'}}></td>
              <td width={'30%'} style={{height:'30px'}}></td>
              <td width={'60%'} style={{height:'30px'}}>{inputEmailErr}</td>
              <td width={'5%'}  style={{height:'30px'}}></td>
            </tr>
            <tr width={'100%'} className={styles.Hregister_riga} >
              <td width={'5%'} ></td>
              <td width={'30%'}>Password</td>
              <td width={'60%'}>
              <input id={'inputPass'}
                className={styles.h_input}
                onChange={handleInputs}
                value={inputPass}
                >
              </input>
              </td>
              <td width={'5%'} align={'center'}></td>
            </tr>
            <tr width={'100%'} >
              <td width={'5%'}  style={{height:'30px'}}></td>
              <td width={'30%'} style={{height:'30px'}}></td>
              <td width={'60%'} style={{height:'30px'}}>{inputPassErr}</td>
              <td width={'5%'}  style={{height:'30px'}}></td>
            </tr>
        </table>
        <table width={'100%'}>
            <tr>
              <td width={'10%'}></td>
              <td width={'80%'} align={'center'}></td>
              <td width={'10%'}></td>
            </tr>
            <tr>
              <td width={'10%'}></td>
              <td width={'80%'} align={'center'} onMouseEnter={(e) => {HandleInputButtonHover(e)}}>
                {validInput === true ? (
                  <div 
                  className={styles.Hregister_submit} 
                  onClick={(e) => {loginSubmit()}}
                >SUBMIT</div>
                ) : (
                  <div 
                  className={styles.Hregister_submit_blocked} 
                >SUBMIT</div>
                )}
                </td>
              <td width={'10%'}></td>
            </tr>
        </table>   
      </div>
    </div>
  </React.Fragment>
  );


  let Hlogin_1 = ( 

  <div className = {styles.header_modal_container__login}>
     <div className = {styles.childLogin}>
     <div>&nbsp;</div>
      <div>LOGIN</div>
      <div style={{cursor:"pointer"}} onClick={() => props.closeModal()}>X</div>
     </div>
     <div className = {styles.childLogin}>
     <div>name<br></br><span>&nbsp;</span></div>
      <div>
        <input id={'inputName'}
                className={styles.l_input}
                onChange={handleInputs}
                value={inputName}
                >
        </input>
        <span className={styles.login_font}>{inputNameErr != '' ? inputNameErr : <span>&nbsp;</span>}</span>
      </div>
     </div>
     <div className = {styles.childLogin}>
     <div>Email<br></br><span>&nbsp;</span></div>
      <div>
      <input id={'inputEmail'}
                className={styles.l_input}
                onChange={handleInputs}
                value={inputEmail}
                >
              </input>
              <span className={styles.login_font}>{inputEmailErr != '' ? inputEmailErr : <span>&nbsp;</span>}</span>
      </div>
     </div>
     <div className = {styles.childLogin}>
     <div>Password<br></br><span>&nbsp;</span></div>
      <div>
      <input id={'inputPass'}
                className={styles.l_input}
                onChange={handleInputs}
                value={inputPass}
                >
       </input>
       <span className={styles.login_font}>{inputPassErr != '' ? inputPassErr : <span>&nbsp;</span>}</span>
      </div>
     </div>

     <div className = {styles.childLogin} onMouseEnter={(e) => {HandleInputButtonHover(e)}} >
     {validInput === true ? (
                  <div style={{cursor:"pointer"}} 
                  className={styles.Hregister_submit} 
                  onClick={(e) => {loginSubmit()}}
                >SUBMIT</div>
                ) : (
                  <div style={{cursor:"pointer"}} 
                  className={styles.Hregister_submit_blocked} 
                >SUBMIT</div>
                )}
     </div>
     



  </div>
 

  );






  // sezione per la gestione di tutti modal dell'haeder
  /*
   modal_id = è l' id passato dal coponente padre per andare a gestire 
  */
const modal_id = props.nameModal;
var objectModal = defaultModal;

switch (modal_id) {
	case 'Hcategories' :
		  break;
	case 'Hfavorite' :
		  break;
	case 'Hadd' :
		  break;
	case 'Hremove' :
		  break;
	case 'Hregister' :
      objectModal = Hregister;
		  break;
	case 'Hlogin' :
       objectModal = Hlogin_1;
		  break;
	case 'Hlogout' :
      objectModal = ''
		  break;
  default:
    console.log(`la sezione non è gestita correttamente`);
}

  return (
    <React.Fragment>
   {objectModal}
   </React.Fragment>
  );
}

export default Hmodal;

