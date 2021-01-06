import React, { useContext, useEffect, Fragment, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native'
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
    Form,
    Footer,
    FooterTab,
    Button
} from 'native-base';
import globalStyles from '../styles/global';
import { Picker } from '@react-native-community/picker';

import firebase from '../firebase/firebase';

import  FirebaseContext from '../context/firebase/firebaseContext';
import PedidoContext from '../context/pedidos/pedidosContext';
import ambiente from '../app.json';

const PagoPedido = () => {

    const navigation = useNavigation();
    
    const [ metodo, guardarMetodo ] = useState('');
    const [ facturacion, guardarFacturacion ] = useState('');

    let eleccionPago;
    let botonPago;

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
        
        if(ambiente.environment == "test"){
            botonPago = <Text>Aquí iría el botón de pagos</Text>;

            eleccionPago = <Picker
            selectedValue={ facturacion }
            onValueChange={ facturacion => obtenerFacturacion(facturacion) }
            >
                <Picker.Item label="- Seleccione la forma de facturación -" value="" />
                <Picker.Item label="Física" value="fisica" />
                <Picker.Item label="Electrónica" value="electronica" />
            </Picker>;

            // eleccionPago = <com.paymentez.android.view.CardMultilineWidget
            //     id="@+id/card_multiline_widget"
            //     layout_alignParentTop="true"
            //     layout_width="match_parent"
            //     layout_height="wrap_content"/>


            // cardToSave = cardWidget.getCard();

            // if (cardToSave == null) {
            //     Alert.show(mContext,
            //         "Error",
            //         "Invalid Card Data");
            //     return;
            // }

        } else if(ambiente.environment == "produccion"){
            eleccionPago = <Text>Tarjeta Produccion</Text>;
        }


    }

    const obtenerMetodo = metodo => {
        guardarMetodo(metodo); 
    }

    const obtenerFacturacion = facturacion => {
        guardarFacturacion(facturacion);
    }

    // Finaliza el proceso de pago y la compra
    const finalizarCompra = () => {
        Alert.alert(
            'Revisa tu información',
            'Una vez que finalices la compra no podrás editar tus datos',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        // crear un objeto
                        // const pagoObj = {
                        //     tiempoentrega: 0,
                        //     completado: false,
                        //     total: Number(total),
                        //     orden: pedido, // array
                        //     editado: Date.now(),
                        //     mesa: state.mesa
                        // }

                        console.log('Al Pago');

                        try {
                            if(metodo == "efectivo" && facturacion == "fisica"){
                                Alert.alert('Información','Por favor acércate a la caja para pagar tu pedido.');
                                console.log("Método: Efectivo - Facturación: Física");
                            }else if(metodo == "efectivo" && facturacion == "electronica"){
                                Alert.alert('Información','Por favor acércate a la caja para pagar tu pedido.');
                                console.log("Método: Efectivo - Facturación: Electrónica");
                            }else if(metodo == "tarjeta" && facturacion == "fisica"){
                                Alert.alert('Información','Por favor acércate a la caja para recibir tu factura.');
                                console.log("Método: Tarjeta - Facturación: Física");
                            }else if(metodo == "tarjeta" && facturacion == "electronica"){
                                Alert.alert('Información','Por favor acércate a la caja para finalizar tu pedido.');
                                console.log("Método: Tarjeta - Facturación: Electrónica");
                            }
                            else{
                                console.log(metodo.value);
                                console.log(facturacion.value);
                            }
                        } catch (error) {
                            console.log(error);
                        }
                      
                    }
                }, 
                { text: 'Revisar', style: 'cancel'}
            ]
        )
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
                    {botonPago}
                    {eleccionPago}
                </Content>
                <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => finalizarCompra()  }
                        style={[globalStyles.boton]}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Confirmar información</Text>
                    </Button>
                </FooterTab>
            </Footer>
            </Container>
        );
    }
}

export default PagoPedido;