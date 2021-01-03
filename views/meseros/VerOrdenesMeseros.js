import React, { useContext, useEffect, Fragment } from 'react';
import { StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Content,
    List,
    ListItem,
    Text,
    Body,
    Button
} from 'native-base';
import globalStyles from '../../styles/global';

import FireMeseroContext from '../../context/fireMeseros/fireMeseroContext';
import PedidoContext from '../../context/pedidos/pedidosContext';


const VerOrdenesMeseros = (props) => {

    // Context de Firebase 
    const { ordenes, obtenerOrdenes} = useContext(FireMeseroContext);

    // Context de pedido
     const { seleccionarPlatillo, guardarPedido } = useContext(PedidoContext);

    // Hook para redireccionar
    const navigation = useNavigation();

    useEffect(() => {
        obtenerOrdenes();
    }, []);


    return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={{ backgroundColor: '#FFF' }}>
                <List>
                    {ordenes.map( (ordenado, i) => {
                        const { mesa, orden, total, id} = ordenado;
                        return (
                            <Fragment key={id}>
                                <Text style={globalStyles.subtitulo}> Mesa#: {mesa}</Text>
                                <ListItem
                                     onPress={ () => {
                                          navigation.navigate("EditarOrdenesMeseros",{arrayPedido:orden});
                                          seleccionarPlatillo(ordenado);
                                          guardarPedido(ordenado);
                                      }}
                                >
                                    <Body>
                                        <Text>
                                        {orden.map( (suborden) => {
                                            const { cantidad, nombre , id } = suborden;
                                            return(
                                                <Fragment key={id}>
                                                    
                                                        <Text className="text-gray-600" style={styles.platosStyle}> {cantidad} {nombre} </Text>
                                                    
                                                </Fragment>
                                            )
                                        } )}
                                        </Text>
                                        <Text>Precio: $ {total} </Text>
                                    </Body>
                                </ListItem>
                            </Fragment>
                        )
                    })}
                </List>
                <View style={[globalStyles.contenido, styles.contenido]}>
                <Button
                    style={[globalStyles.boton,styles.separadorTexto]}
                    rounded
                    block
                    onPress={ () => navigation.navigate('InicioMeseros')  }
                >
                    <Text style={globalStyles.botonTexto}>Regresar</Text>
                </Button>
            </View>
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
 
export default VerOrdenesMeseros;