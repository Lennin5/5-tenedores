import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import LoadingManual from "../../components/LoadingManual";

import Login from "./Login";
import UserLogged from "./UserLogged";

export default function Account() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) {
	return <LoadingManual isVisible={false} />		

	//TALVEZ AQUÍ FUNCIONE LO DE SI EL USUARIO NO TIENE INTERNET
	// QUE LA APP LO REDIRECCIONE A LA PÁGINA DE NO HAY CONEXIÓN O ALGO ASÍ :)
	} 

	if (login == true) {
		return <UserLogged /> 
	} else
	if (login == false) {
		return <Login /> 
	}
}

