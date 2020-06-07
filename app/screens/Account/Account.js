import React, { useState, useEffect } from "react";
import * as firebase from "firebase";

import LoadingAuto from "../../components/LoadingAuto";

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
	return <LoadingAuto />			
	} 

	if (login == true) {
		return <UserLogged /> 
	} else
	if (login == false) {
		return <Login /> 
	}
}

