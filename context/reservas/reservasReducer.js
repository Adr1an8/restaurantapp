import {
    NUEVA_RESERVA,
    CONFIRMAR_RESERVA,
    MOSTRAR_RESUMEN,
    RESERVA_REALIZADA
} from '../../types'

export default (state,action) => {
    switch (action.type) { 
        case CONFIRMAR_RESERVA:
            return {
                ...state,
                reserva: [...state.pedido, action.payload]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                idreserva: action.payload
            }
        case RESERVA_REALIZADA:
            return {
                ...state,
                reserva: [],
                idreserva: action.payload
            }
        default:
            return state;
    }
}