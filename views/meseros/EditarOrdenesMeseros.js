import React, {  useContext, useEffect, useState } from 'react';
import {  Alert, TextInput } from 'react-native';
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
    FooterTab
} from 'native-base';
import { useNavigation } from '@react-navigation/native'
import globalStyles from '../../styles/global';
import firebase from '../../firebase';

import PedidoContext from '../../context/pedidos/pedidosContext';

const EditarOrdenMeseros = (props) => {

    const navigation = useNavigation();

    const initialState = {
        mesa: ""
    }

    // context de pedido
    const { pedido, platillo, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

    const { id } = platillo;
    const idPlatoEditar = id;

    let pedidos = props.route.params.arrayPedido; 

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

                        // crear un objeto
                        const pedidoObj = {
                            tiempoentrega: 0,
                            completado: false,
                            cancelado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now(),
                            mesa: state.mesa
                        }

                        try {
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);

                            // redireccionar a progreso
                            navigation.navigate("ProgresoPedido")
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
                    onPress: async () => {
                        
                        try{
                            const newObject = pedidos.filter(item => item.id !== id);
                            const platoPedido = await firebase.db.collection('ordenes')
                            .doc(idPlatoEditar)
                            .update({
                                orden: newObject
                            })
                            // redireccionar a progreso
                            navigation.navigate("VerOrdenesMeseros")
                            
                        } catch (error) {
                            console.log(error);
                        }    
                    }
                }, 
                { text: 'Cancelar', style: 'cancel'}
            ]
        )
    }
    const EliminacionCompleta = () => {
        Alert.alert(
            'Desea cancelar la orden',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        try {
                            const cancelarPedido = await firebase.db.collection('ordenes')
                            .doc(idPlatoEditar)
                            .update({
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
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pediddo</H1>
                {pedidos.map( (platillos, i) => {
                    const { nombre, total, imagen, cantidad, id } = platillos;
                    return( 
                        <List key={id + i}>
                            <ListItem thumbnail>
                                <Thumbnail 
                                    large 
                                    square  
                                    source={{ uri: imagen }} 
                                />
                                <Body>
                                    <Text>{nombre} </Text>
                                    <Text>Cantidad: {cantidad} </Text>
                                    <Text>Precio: $ {total} </Text>

                                    <Button
                                        onPress={ () => confirmarEliminacion(id) }
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar Plato</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    )
                })}
                 <Button
                        onPress={ () => EliminacionCompleta() }
                        full
                        danger
                        style={{marginTop: 20}}
                    >
                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Eliminar</Text>
                    </Button>
                <Button
                    onPress={ () => navigation.navigate('Menu') }
                    style={ {marginTop: 30}}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        // onPress={ () => progresoPedido()  }
                         style={[globalStyles.boton ]}
                         full
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
     );
}
 
export default EditarOrdenMeseros;