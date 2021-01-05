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
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => navigation.navigate("VerOrdenesMeseros")  }
                         style={[globalStyles.boton ]}
                         full
                    >
                        <Text style={globalStyles.botonTexto}>Regresar</Text>
                    </Button>
                </FooterTab>
            </Footer>

        </Container>
     );
}
 
export default EditarOrdenMeseros;