import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native'
import { Container, Text, H1, H3, Button, Footer, FooterTab, Thumbnail } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const PagoEfectivo = () => {

    const navigation = useNavigation();

    const { idpedido } = useContext(PedidoContext);

    const [ tiempo, guardarTiempo] = useState(0);
    const [ completado, guardarCompletado] = useState(false);

    useEffect(() => {
        const obtenerProducto = () => {
            firebase.db.collection('ordenes')
                        .doc(idpedido)
                        .onSnapshot(function(doc) {
                            guardarTiempo(doc.data().tiempoentrega);
                            guardarCompletado(doc.data().completado)
                        })
        }

        obtenerProducto()
    }, []);

    // Muestra el countdown en la pantalla
    const renderer = ({minutes, seconds}) => {
        return (
            <Text style={styles.tiempo}>{minutes}:{seconds} </Text>
        )
    }

    // Redirecciona a inicio
    const finalizarPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que procedas al pago no podrás editar tu consumo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        try {
                            // redireccionar a selección de método de pago
                            navigation.navigate("Login")
                        } catch (error) {
                            console.log(error);
                        }
            
                    }
                }, 
                { text: 'Revisar', style: 'cancel'}
            ]
        )
    }

    return ( 
         <Container style={globalStyles.contenedor}>
             <View style={[ globalStyles.contenido, { marginTop: 50} ]}>
                { tiempo === 0 && (
                    <>
                        <Text style={{ textAlign: 'center'}}>Hemos recibido tu orden...</Text>
                        <Text style={{ textAlign: 'center'}}>Estamos calculando el tiempo de entrega</Text>                       
                    </>
                ) }
                
                { !completado && tiempo > 5 && (
                    <>
                        <Text style={{ textAlign: 'center'}}>Su orden estará lista en:  </Text>
                        <Text>
                            <Countdown
                                date={ Date.now() + tiempo * 60000 }
                                renderer={renderer}
                            />
                        </Text>
                    </>
                )} 

                { completado && (
                    <>
                        <H1 style={styles.textoCompletado}>Orden Lista</H1>
                        <H3 style={styles.textoCompletado}>Por favor, pase a recoger su pedido</H3>                        
                    </>
                ) }
             </View>
             <View>
                <Thumbnail
                    style={styles.logoFooter} 
                    source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                />
                <Footer>
                    <FooterTab>
                        <Button
                            onPress={ () => navigation.navigate("Principal")  }
                            style={[globalStyles.boton]}
                            full
                        >
                        <Text style={globalStyles.botonTexto}>Ir a Inicio</Text>
                        </Button>
                </FooterTab>
                </Footer>
             </View>
         </Container>
     );
}

const styles = StyleSheet.create({
    logoFooter: {
        marginTop: 5,
        paddingTop: 100,
        width: '100%',
        
    },
})
 
export default PagoEfectivo;