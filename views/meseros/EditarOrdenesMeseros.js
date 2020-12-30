import React, { useContext, Fragment } from 'react';
import { StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Content,
    List,
    ListItem,
    Text,
    Body,
    Button,
    
} from 'native-base';
import globalStyles from '../../styles/global';
import PedidoContext from '../../context/pedidos/pedidosContext';

import firebase from '../../firebase';

const EditarOrdenesMeseros = () => {

    // Context de pedido
    const { platillo } = useContext(PedidoContext);
    const {orden, id} = platillo; 

    const navigation = useNavigation();

    const eliminarPedido = () => {
        Alert.alert(
            'Deseas eliminar el pedido',
            'Una vez eliminado no se podra recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        try {
                            const pedidoEliminado = await firebase.db.collection('ordenes')
                            .doc(id)
                            .update({
                                completado: false,
                                cancelado: true

                            })

                            // redireccionar a progreso
                            navigation.navigate("VerOrdenesMeseros")
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
            <Content style={{ backgroundColor: '#FFF' }}>
            <List>
                    {orden.map( (platillos) => {
                        const { nombre, total, cantidad, id} = platillos;
                        return (
                            <Fragment key={id}>
                                <ListItem
                                    // onPress={ () => {

                                    //     // Eliminar algunas propiedades del platillo
                                    //     const { existencia, ...platillo2 } = platillo;

                                    //     seleccionarPlatillo(platillo2);
                                    //     navigation.navigate("DetallePlatillo");
                                    // }}
                                >
                                    <Body>
                                        <Text>{nombre} </Text>
                                        <Text>Cantidad: {cantidad} </Text>
                                        <Text>Precio: $ {total} </Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
                <Button
                    onPress={ () => eliminarPedido() }
                    full
                    danger
                    style={{marginTop: 20}}
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar</Text>
                </Button>
            </Content>
        </Container>
     );
}
const styles = StyleSheet.create({
    separador: {
        backgroundColor: '#000',
    },
    separadorTexto: {
        color: '#FFDA00',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    platosStyle: {
        fontSize: 20
    }
})
 
export default EditarOrdenesMeseros;