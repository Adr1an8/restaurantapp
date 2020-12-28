import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native'
import { Container, Text, Button } from 'native-base';
import globalStyles from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';
import firebase from '../../firebase';

const ProgresoPedidoMeseros = () => {

    const navigation = useNavigation();

    const { idpedido } = useContext(PedidoContext);

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

    return ( 
         <Container style={globalStyles.contenedor}>
             <View style={[ globalStyles.contenido, { marginTop: 50} ]}>
                    <Button style={[ globalStyles.boton, { marginTop: 100}]}
                        rounded
                        block
                        onPress={ () => navigation.navigate("MenuMeseros") }
                    >
                        <Text style={globalStyles.botonTexto}>Nueva Orden</Text>
                    </Button>
             </View>
         </Container>
     );
}

const styles = StyleSheet.create({
    tiempo: {
        marginBottom: 20,
        fontSize: 60,
        textAlign: 'center',
        marginTop: 80,
    },
    textoCompletado: {
        textAlign: 'center',
        textTransform: 'uppercase',
        marginBottom: 20
    }
})
 
export default ProgresoPedidoMeseros;