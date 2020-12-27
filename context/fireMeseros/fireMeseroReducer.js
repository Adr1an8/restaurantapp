import { OBTENER_ORDENES_EXITO } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_ORDENES_EXITO:
            return {
                ...state,
                ordenes: action.payload
            }

        default:
            return state;
    }
}