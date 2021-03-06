import React, { useContext} from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Text,
    Footer,
    FooterTab,
    Button,
    Body,
    Left,
    Thumbnail
} from 'native-base';
import globalStyles from '../../styles/global';
import firebase from '../../firebase';

import ReservaContext from '../../context/reservas/reservasContext';

const ResumenReserva = (props) => {

    // Hook para redireccionar
    const navigation = useNavigation();

    // context de pedido
    const { reservaRealizada, mostrarResumen} = useContext(ReservaContext);

     const progresoReserva = () => {
         Alert.alert(
             'Revisa tu reserva',
             'Por Favor llegar con tiempo de anticipación a su reserva',
             [
                 {
                     text: 'Confirmar',
                     onPress: async () => {

                         try {
                            const reserva = await firebase.db.collection('reservas').add(props.route.params.saveReserva);
                            reservaRealizada(reserva.id);
                            mostrarResumen(props.route.params.saveReserva);

                             // redireccionar a progreso
                             navigation.navigate("InicioReserva")
                            
                         } catch (error) {
                             console.log(error);
                         }
                     }
                 },
                 { text: 'Revisar', style: 'cancel' }
             ]
         )
     }

     return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#FFF' }}>
            <Text style={globalStyles.titulo}>Resumen Reserva</Text>
                <Card>
                    <CardItem>
                        <Left><Text>Fecha:</Text></Left>
                        <Body><Text>{props.route.params.saveReserva.diahoraReserva}</Text></Body>
                    </CardItem>
                    <CardItem>
                        <Left><Text>Nombre:</Text></Left>
                        <Body><Text>{props.route.params.saveReserva.nombre}</Text></Body>
                    </CardItem>
                    <CardItem>
                        <Left><Text>Email:</Text></Left>
                        <Body><Text>{props.route.params.saveReserva.email}</Text></Body>    
                    </CardItem>
                    <CardItem>
                        <Left><Text>Telefono:</Text></Left>
                        <Body><Text>{props.route.params.saveReserva.phone}</Text></Body>    
                    </CardItem>
                    <CardItem>
                        <Left><Text>N. Personas:</Text></Left>
                        <Body><Text>{props.route.params.saveReserva.personas}</Text></Body>    
                    </CardItem>
                </Card>
                <Card>
                    <CardItem>
                        <Text>Comentarios Adicionales: </Text>    
                    </CardItem>
                    <CardItem>
                        <Text>{props.route.params.saveReserva.detail}</Text>
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
                        onPress={ () => progresoReserva() }
                        style={[globalStyles.boton, styles.separadorTexto ]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Confirmar</Text>
                    </Button>
            </Content>
            <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
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

    separadorTexto: {
        marginTop: 10
    },
    logoFooter: {
        marginTop: 5,
        paddingTop: 100,
        width: '100%',
    },
})
 
export default ResumenReserva;