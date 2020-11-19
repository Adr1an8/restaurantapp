import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Content,
    List,
    ListItem,
    Text,
    Footer,
    FooterTab,
    Button,
    Body
} from 'native-base';
import globalStyles from '../styles/global';

import  FireReservaContext from '../context/fireReserva/fireReservaContext';


const ResumenReserva = () => {

    // Context de Firebase 
    const { reserva, obtenerReservas } = useContext(FireReservaContext);

    // Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerReservas();
    }, []);

    return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <List>
                    {reserva.map( (reservacion, i) => {
                        const { nombre, correo, phone, datetime, details} = reservacion;
                        return (

                                <ListItem>
                                    <Body>
                                        <Text>{nombre} </Text>
                                        <Text 
                                            note
                                            numberOfLines={2}
                                        >
                                            {correo}
                                        </Text>
                                        <Text>{phone} </Text>
                                        <Text>{datetime} </Text>
                                        <Text 
                                            note
                                            numberOfLines={4}
                                        >
                                            {details}
                                        </Text>
                                    </Body>
                                </ListItem>
                        )
                    })}
                </List>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => navigation.navigate('NuevaOrden')  }
                        style={[globalStyles.boton ]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Cancelar</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
     );
}

const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000',
    },
    separadorTexto: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})
 
export default ResumenReserva;