import React, {  useContext, useEffect, useState } from 'react';
import {  Alert, TextInput, StyleSheet } from 'react-native';
import {
    Container,
    Content, 
    List,
    ListItem,
    Thumbnail, 
    Text,
    Left, 
    Body,
    Button,
    H1, 
    Footer, 
    FooterTab,
    
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../styles/global';
import firebase from '../firebase';
import { Picker } from '@react-native-community/picker';

import 'moment-timezone';
import moment from 'moment';

import PedidoContext from '../context/pedidos/pedidosContext';

const ResumenPedido = () => {

    const navigation = useNavigation();

    const initialState = {
        mesa: "",
        formaPago: "inicial"
    }

    // context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

    const [state, setState] = useState(initialState);
    
    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce( (nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);

        mostrarResumen(nuevoTotal)
    }

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    };

    // redirecciona a Progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        const dateNow = moment().format();

                        // crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            cancelado: false,
                            pendienteDespacho: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: dateNow,
                            mesa: state.mesa,
                            formaPago: state.formaPago,
                            estado: 'Pendiente'
                        }

                        if(!pedidoObj.mesa){
                            Alert.alert("Debe ingresar una mesa");
                        }else if (pedidoObj.mesa > 25 ){
                            Alert.alert("Solo existen 25 mesas");
                        }else{

                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);

                            // redireccionar a progreso
                            if(state.formaPago == "Efectivo"){
                                navigation.navigate("PagoEfectivo")
                            } else if(state.formaPago == "Tarjeta"){
                                navigation.navigate("PagoTarjeta", { totalPagar: Number(total) })
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

    // Elimina un producto del arreglo de pedido
    const confirmarEliminacion = id => {
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Eliminar del state
                        eliminarProducto(id);
                    }
                }, 
                { text: 'Cancelar', style: 'cancel'}
            ]
        )
    }

    return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map( (platillo, i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo;
                    return( 
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{ uri: imagen}} />
                                </Left>

                                <Body>
                                    <Text>{nombre} </Text>
                                    <Text>Cantidad: {cantidad} </Text>
                                    <Text>Precio: $ {precio} </Text>

                                    <Button
                                        onPress={ () => confirmarEliminacion(id) }
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}

                <Text style={globalStyles.cantidad}>Total a Pagar: $ {total}</Text>
                <TextInput
                    placeholder="Ingrese el numero de mesa!"
                    style={{fontWeight: 'bold', fontSize: 20}}
                    onChangeText={(value) => handleChangeText(value, "mesa")}
                    keyboardType="numeric"
                    maxLength={3}
                    value={state.mesa}
                    underlineColorAndroid="transparent"
                />
                <Button
                    onPress={ () => navigation.navigate('Menu') }
                    style={ {marginTop: 30}}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
                <Picker
                    selectedValue = { state.formaPago }
                    onValueChange = { (value) => { handleChangeText(value, "formaPago") } }
                >
                    <Picker.Item label="- Seleccione el método de pago -" value="" />
                    <Picker.Item label="Efectivo" value="Efectivo" />
                    <Picker.Item label="Tarjeta de Crédito" value="Tarjeta" />
                </Picker>
            </Content>
            <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => progresoPedido()  }
                        style={[globalStyles.boton ]}
                        full
                        disabled={ state.formaPago == "inicial" }
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>

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
 
export default ResumenPedido;