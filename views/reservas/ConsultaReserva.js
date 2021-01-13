import React, { useContext, useEffect, useState } from 'react';
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
    FooterTab,
    Thumbnail,
    CheckBox
    
} from 'native-base';

import globalStyles from '../../styles/global';

import ReservaContext from '../../context/reservas/reservasContext';

import firebase from '../../firebase';

const ConsultaReserva = () => {

    //Context guardado
    const { reservacion, idreserva, mostrarResumen } = useContext(ReservaContext);

    const [reserva, setReserva] = useState([]);

    // Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        if(idreserva){
            const getReservaById = async id => {
                const dbRef = firebase.db.collection('reservas').doc(id)
                const doc = await dbRef.get();
                const reserva = doc.data();
                setReserva({
                    ...reserva
                })

            }
            getReservaById(idreserva);
        }
    },[idreserva])
    

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = (id) => {
        Alert.alert(
            'Alerta',
            'Su accion no se podra recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        try {
                            await firebase.db.collection('reservas')
                            .doc(id)
                            .update({
                                activo: false,
                            })
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

    if ( !reservacion ){
        return(
            <Text style={globalStyles.titulo}>No tiene una reservacion</Text>
        );
    }

    return(
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <Text style={globalStyles.titulo}>Resumen Reserva</Text>
                <Card>
                    <CardItem>
                        <Left><Text>Fecha:</Text></Left>
                        <Body><Text>{reserva.diahoraReserva}</Text></Body>
                    </CardItem>
                    <CardItem>
                        <Left><Text>Nombre:</Text></Left>
                        <Body><Text>{reserva.nombre}</Text></Body>
                    </CardItem>
                    <CardItem>
                        <Left><Text>Email:</Text></Left>
                        <Body><Text>{reserva.email}</Text></Body>    
                    </CardItem>
                    <CardItem>
                        <Left><Text>Telefono:</Text></Left>
                        <Body><Text>{reserva.phone}</Text></Body>    
                    </CardItem>
                    <CardItem>
                        <Left><Text>N. Personas:</Text></Left>
                        <Body><Text>{reserva.personas}</Text></Body>    
                    </CardItem>
                    {reserva.pendingAprobe === false && (
                        <>
                            <CardItem>
                                <Left><Text>Estado:</Text></Left>
                                <Body><CheckBox checked={true} color="orange"/></Body>    
                            </CardItem>
                        </>
                    )}
                     {reserva.pendingAprobe === true && (
                        <>
                            <CardItem>
                                <Left><Text>Estado:</Text></Left>
                                <Body><CheckBox checked={false} color="green"/></Body>    
                            </CardItem>
                        </>
                    )}
                    {reserva.activo === false && (
                        <>
                            <CardItem>
                                <Left><Text>Estado:</Text></Left>
                                <Body><CheckBox checked={true} color="red"/></Body>    
                            </CardItem>
                        </>
                    )}
                </Card>
                <Card>
                    <CardItem>
                        <Text>Comentarios Adicionales: </Text>    
                    </CardItem>
                    <CardItem>
                        <Text>{reserva.detail}</Text>
                    </CardItem>
                </Card>
                {reserva.activo === true && (
                        <>
                             <Button
                                onPress={ () => navigation.navigate('FormularioReserva')  }
                                style={[globalStyles.boton, styles.separadorTexto ]}
                                full
                            >
                                <Text style={globalStyles.botonTexto}>Editar</Text>
                            </Button>
                        </>
                    )}
               
                <Button
                    onPress={ () => confirmarEliminacion(idreserva) }
                    full
                    danger
                    style={{marginTop: 20}}
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar</Text>
                </Button>            
            </Content>
            <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
            {reserva.activo === true && (
                <>
                    <Footer>
                        <FooterTab>
                            <Button
                                onPress={ () => navigation.navigate('InicioReserva')  }
                                style={[globalStyles.boton ]}
                                full
                            >
                                <Text style={globalStyles.botonTexto}>Regresar</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </>
            )}

        </Container>
    )

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

export default ConsultaReserva;