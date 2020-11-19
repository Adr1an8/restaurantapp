import { OBTENER_RESERVAS_EXITO } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_RESERVAS_EXITO:
            return {
                ...state,
                reserva: action.payload
            }

        default:
            return state;
    }
}