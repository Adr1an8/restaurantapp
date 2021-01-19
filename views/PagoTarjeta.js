import React, { useContext, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View, Alert } from 'react-native'
import {
    Container,
    Text,
    Body,
    Footer,
    FooterTab,
    Button,
    Thumbnail,
    H1,
    H3
} from 'native-base';
import globalStyles from '../styles/global';

import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import firebase from '../firebase';
import Countdown from 'react-countdown';

const PagoTarjeta = (props) => {

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
                            guardarCompletado(doc.data().completado);
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

    
    return (
        <Container style={globalStyles.contenedor}>
                            
            <View 
            style={[ globalStyles.contenido, { marginTop: 50} ]}>
            <WebView
                    source={{ uri: "https://0d6288a71451.ngrok.io" }}
                    injectedJavaScript={`document.getElementById('inject').innerHTML = '<form name="f1" action="/paypal"><input type="hidden" name="source" value="${props.route.params.totalPagar}"/><button type="submit" style="background-color: #000000; color: white; text-align: center; border-radius: 10px; font-size: 16px; width:200px; height: 50px;">PROCEDER AL PAGO</button></form>'`}                  
                />
            </View>
            { tiempo === 0 && (
                <>
                    <Text style={{ textAlign: 'center'}}>Hemos recibido tu orden...</Text>
                    <Text style={{ textAlign: 'center'}}>Por favor proceda al pago para recibir su pedido</Text>
                    <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />                     
                </>
            ) }
            
            { !completado && tiempo > 5 && (
                <>
                    <Text style={{ textAlign: 'center'}}>Su orden estará lista en:  </Text>
                    <Text style={{ textAlign: 'center'}}>Por favor proceda al pago para recibir su pedido</Text>
                    <Text style={{ textAlign: 'center'}}>Indique al mesero si su pago fue realizado exitosamente!</Text>
                    <Text>
                        <Countdown
                            date={ Date.now() + tiempo * 60000 }
                            renderer={renderer}
                        />
                    </Text>
                    <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />
                </>
            )} 

            { completado && (
                <>
                    <H1 style={styles.textoCompletado}>Orden Lista</H1>
                    <H3 style={styles.textoCompletado}>Su orden ya esta en camino!</H3>
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
                </>
            ) }
            
            
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

export default PagoTarjeta;