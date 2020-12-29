import React, { useContext} from 'react';
import { StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
    
    Text,
    Container,
    Content,
    Card,
    CardItem,
    Body,
    Left,
    Button,
    Footer,
    FooterTab
    
} from 'native-base';

import globalStyles from '../../styles/global';

import ReservaContext from '../../context/reservas/reservasContext';

import firebase from '../../firebase';

const ConsultaReserva = () => {

    //Context guardado
    const { reservacion, idreserva, mostrarResumen } = useContext(ReservaContext);

    // Hook para redireccionar
    const navigation = useNavigation()

    if ( reservacion === null){
        return(
            <Text style={globalStyles.titulo}>No tiene una reservacion</Text>
        )
    }

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = () => {
        Alert.alert(
            'Desea eliminar la reserva',
            'Una vez eliminada, no se prodra recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        try {
                            await firebase.db.collection('reservas').doc(idreserva).delete();
                            mostrarResumen(null);

                            // redireccionar a progreso
                            navigation.navigate("NuevaOrden")
                        } catch (error) {
                            console.log(error);
                        }
                      
                    }
                }, 
                { text: 'Revisar', style: 'cancel'}
            ]
        )
    }

    return(
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#FFF' }}>
            <Text style={globalStyles.titulo}>Resumen Reserva</Text>
                <Card>
                    <CardItem>
                        <Left><Text>Fecha:</Text></Left>
                        <Body><Text>{reservacion.datetime}</Text></Body>
                    </CardItem>
                    <CardItem>
                        <Left><Text>Nombre:</Text></Left>
                        <Body><Text>{reservacion.nombre}</Text></Body>
                    </CardItem>
                    <CardItem>
                        <Left><Text>Email:</Text></Left>
                        <Body><Text>{reservacion.email}</Text></Body>    
                    </CardItem>
                    <CardItem>
                        <Left><Text>Telefono:</Text></Left>
                        <Body><Text>{reservacion.phone}</Text></Body>    
                    </CardItem>
                    <CardItem>
                        <Left><Text>N. Personas:</Text></Left>
                        <Body><Text>{reservacion.personas}</Text></Body>    
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Text>Comentarios Adicionales: </Text>    
                    </CardItem>
                    <CardItem>
                        <Text>{reservacion.detail}</Text>
                    </CardItem>
                </Card>
                    <Button
                        onPress={ () => navigation.navigate('FormularioReserva')  }
                        style={[globalStyles.boton, styles.separadorTexto ]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Editar</Text>
                    </Button>
                    <Button
                        onPress={ () => confirmarEliminacion(idreserva.id) }
                        full
                        danger
                        style={{marginTop: 20}}
                    >
                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar</Text>
                    </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => navigation.navigate('NuevaOrden')  }
                        style={[globalStyles.boton ]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Regresar</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
    )

}
const styles = StyleSheet.create({

    separadorTexto: {
        marginTop: 10
    }
})

export default ConsultaReserva;