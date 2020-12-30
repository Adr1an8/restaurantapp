import React, { useContext, useEffect, Fragment, useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Header,
    Separator,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Body,
    Form
} from 'native-base';
import globalStyles from '../styles/global';
import { Picker } from '@react-native-community/picker';

import firebase from '../firebase/firebase';

import  FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';

const PagoPedido = () => {

    const navigation = useNavigation();
    
    const [ metodo, guardarMetodo ] = useState('');
    const [ facturacion, guardarFacturacion ] = useState('');

    let eleccionPago;

    if(metodo == "efectivo"){
        eleccionPago = <Picker
            selectedValue={ facturacion }
            onValueChange={ facturacion => obtenerFacturacion(facturacion) }
            >
                <Picker.Item label="- Seleccione la forma de facturación -" value="" />
                <Picker.Item label="Física" value="fisica" />
                <Picker.Item label="Electrónica" value="electronica" />
            </Picker>;
    } 
    else if(metodo == "tarjeta"){
        eleccionPago = <Text>Tarjeta</Text>;
    }

    

    const obtenerMetodo = metodo => {
        guardarMetodo(metodo); 
    }

    const obtenerFacturacion = facturacion => {
        guardarFacturacion(facturacion);
    }

    if(firebase.user.currentUser){
        return (
            <Container style={globalStyles.contenedor}>
                <Content>
                    <Picker
                        selectedValue={ metodo }
                        onValueChange={ metodo => obtenerMetodo(metodo) }
                    >
                        <Picker.Item label="- Seleccione el método de pago -" value="" />
                        <Picker.Item label="Efectivo" value="efectivo" />
                        <Picker.Item label="Tarjeta de Crédito" value="tarjeta" />
                    </Picker>
                    {eleccionPago}
                </Content>
            </Container>
        );
    }
}

export default PagoPedido;