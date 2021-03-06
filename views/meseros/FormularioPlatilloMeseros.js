import React, { useState, useContext, useEffect } from 'react';
import {
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab,
    Thumbnail
} from 'native-base';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';

import PedidoContext from '../../context/pedidos/pedidosContext';

const FormularioPlatilloMeseros = () => {

    // state para cantidades
    const [ cantidad, guardarCantidad] = useState(1);
    const [ total, guardarTotal] = useState(0);

    // context
    const { platillo, guardarPedido } = useContext(PedidoContext);
    const { precio } = platillo;

    // redireccionar
    const navigation = useNavigation();

    // En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

    // Calcula el total del platillo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    }

    // Decrementa en uno
    const decrementarUno = () => {
        if(cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
    }


    // incrementa en uno la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    }

    // Confirma si la orden es correcta
    const confirmarOrden = () => {

        // Almacenar el pedido al pedido principal
        const pedido = {
            ...platillo,
            cantidad,
            total
        }

        // console.log(pedido);
        guardarPedido(pedido);

        // Navegar hacia el Resumen
        navigation.navigate("ResumenPedidoMeseros");
    }

    return ( 
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, marginLeft: '30%' }}
                                onPress={ () => decrementarUno() }
                            >
                                <Icon style={{ fontSize: 40 }} name="remove" />
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                style={{ textAlign: 'center', fontSize: 20 }}
                                value={cantidad.toString() }
                                keyboardType="numeric"
                                onChangeText={ cantidad => guardarCantidad(cantidad) }
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                dark
                                style={{ height: 80, justifyContent: 'center' }}
                                onPress={ () => incrementarUno() }
                            >
                                <Icon style={{ fontSize: 40 }} name="add" />
                            </Button>
                        </Col>
                    </Grid>

                    <Text style={globalStyles.cantidad}>Subtotal: $ {total} </Text>
                </Form>
            </Content>
            <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={ () => confirmarOrden() }
                    >
                        <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
     );
}

const styles = StyleSheet.create({
    logoFooter: {
        marginTop: '10%',
        paddingTop: 100,
        width: '100%',
    },
})
 
export default FormularioPlatilloMeseros;