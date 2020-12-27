import React, { useReducer } from 'react';

import firebase from '../../firebase';
import UserReducer from './userReducer';
import UserContext from './userContext';

import { OBTENER_USUARIOS_EXITO } from '../../types';
import _ from 'lodash';

const UserState = props => {

    // Crear state inicial
    const initialState = {
        user: []
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(UserReducer, initialState);

    // Función que se ejecuta para traer los productos
    const obtenerUsuarios = () => {
  

        // consultar firebase
        firebase.db
            .collection('usuarios')
            .where('rol','==','Mesero')
            .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let usuarios = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            // Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_USUARIOS_EXITO,
                payload: usuarios
            });
        }
    }


    return (
        <UserContext.Provider
            value={{
                user: state.user,
                firebase,
                obtenerUsuarios
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;