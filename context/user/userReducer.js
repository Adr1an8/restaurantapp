import { OBTENER_USUARIOS_EXITO } from '../../types';

export default (state, action) => {
    switch (action.type) {
        case OBTENER_USUARIOS_EXITO:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state;
    }
}