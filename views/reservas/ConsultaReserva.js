import React, { useContext} from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    
    Text,
    
} from 'native-base';

import globalStyles from '../../styles/global';

import ReservaContext from '../../context/reservas/reservasContext';

const ConsultaReserva = () => {

    const { reservacion } = useContext(ReservaContext);

    console.log(reservacion);

    if ( reservacion === null){
        return(
            <Text style={globalStyles.titulo}>No tiene una reservacion</Text>
        )
    }

    return(
        <Text>Hola mundo</Text>
    )

}

export default ConsultaReserva;