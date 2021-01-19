import React, { useReducer } from 'react';

import firebase from '../../firebase';
import FireMeseroReducer from './fireMeseroReducer';
import FireMeseroContext from './fireMeseroContext';

import { OBTENER_ORDENES_EXITO } from '../../types';
import _ from 'lodash';

const FireMeseroState = props => {

    // Crear state inicial
    const initialState = {
        ordenes: []
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(FireMeseroReducer, initialState);

    // Función que se ejecuta para traer los productos
    const obtenerOrdenes = () => {
  

        // consultar firebase
        firebase.db
            .collection('ordenes')
            .where('completado', '==', false) // traer solo los que esten en existencia
            .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let orden = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            // Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_ORDENES_EXITO,
                payload: orden
            });
        }
    }

    return (
        <FireMeseroContext.Provider
            value={{
                ordenes: state.ordenes,
                firebase,
                obtenerOrdenes
            }}
        >
            {props.children}
        </FireMeseroContext.Provider>
    )
}

export default FireMeseroState;