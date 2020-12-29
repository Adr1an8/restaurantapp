import {
    NUEVA_RESERVA,
    CONFIRMAR_RESERVA,
    MOSTRAR_RESUMEN,
    ELIMINAR_RESERVA,
    RESERVA_REALIZADA
} from '../../types'

export default (state,action) => {
    switch (action.type) { 
        case CONFIRMAR_RESERVA:
            return {
                ...state,
                reserva: [...state.reserva, action.payload]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                reservacion: action.payload
            }
        case ELIMINAR_RESERVA:
            return {
                ...state,
                reserva: state.reserva.filter( articulo => articulo.id !== action.payload )
            }
        case RESERVA_REALIZADA:
            return {
                ...state,
                idreserva: action.payload
            }
        default:
            return state;
    }
}