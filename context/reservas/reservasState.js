import React, { useReducer } from 'react';

import ReservaReducer from './reservasReducer';
import ReservaContext from './reservasContext';

import {
    NUEVA_RESERVA,
    CONFIRMAR_RESERVA,
    MOSTRAR_RESUMEN,
    ELIMINAR_RESERVA,
    RESERVA_REALIZADA
} from '../../types'

const ReservaState = props => {

    // Crear state inicial
    const initialState = {
        reserva: [],
        reservacion: null,
        idreserva: '',
    }

    // useReducer con dispatch  para ejecutar las funciones
    const [ state, dispatch ] = useReducer(ReservaReducer, initialState);

    // Cuando el usuario confirma un platillo
    const guardarReserva = reserva => {
        dispatch({
            type: CONFIRMAR_RESERVA,
            payload: reserva
        })
    }

    // Muestra el total a pagar en el resumen
    const mostrarResumen = reservacion => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: reservacion
        })
    }

    // Elimina un articulo del carrito
    const eliminarReserva = id => {
        dispatch({
            type: ELIMINAR_RESERVA,
            payload: id
        })
    }

    const reservaRealizada = id => {
        dispatch({
            type: RESERVA_REALIZADA,
            payload: id
        })
    }

    return (
        <ReservaContext.Provider
            value={{
                reserva: state.reserva,
                reservacion: state.reservacion,
                idreserva: state.idreserva,
                guardarReserva,
                mostrarResumen,
                eliminarReserva,
                reservaRealizada
            }}
        >
            {props.children}
        </ReservaContext.Provider>
    )
}

export default ReservaState;