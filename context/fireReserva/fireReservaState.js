import React, { useReducer } from 'react';

import firebase from '../../firebase';
import FirebaseReducer from './fireReservaReducer';
import FirebaseContext from './fireReservaContext';

import { OBTENER_RESERVAS_EXITO } from '../../types';
import _ from 'lodash';

const FireReservaState = props => {

    // Crear state inicial
    const initialState = {
        reserva: []
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(FirebaseReducer, initialState);

    // Función que se ejecuta para traer los productos
    const obtenerReservas = () => {
  

        // consultar firebase
        firebase.db
            .collection('reservas')
            .where('activo', '==', true)
            .onSnapshot(manejarSnapshot);

        function manejarSnapshot(snapshot) {
            let reservas = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            // Ordenar por categoria con lodash
            // reservas = _.sortBy(reservas, 'categoria');

            // console.log(platillos)

            // Tenemos resultados de la base de datos
            dispatch({
                type: OBTENER_RESERVAS_EXITO,
                payload: reservas
            });
        }
    }


    return (
        <FirebaseContext.Provider
            value={{
                reserva: state.reserva,
                firebase,
                obtenerReservas
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FireReservaState;