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
    Button,
    Thumbnail,
    CheckBox,
    CardItem,
    Left

} from 'native-base';
import globalStyles from '../../styles/global';

import FireMeseroContext from '../../context/fireMeseros/fireMeseroContext';


const VerOrdenesMeseros = (props) => {

    // Context de Firebase 
    const { ordenes, obtenerOrdenes} = useContext(FireMeseroContext);

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
                        const { mesa, orden, total, id, pendienteDespacho, formaPago, cancelado} = ordenado;
                        return (
                            <Fragment key={id}>
                                <Content style={styles.borderOrdenes}>
                                <Text style={globalStyles.subtitulo}> Mesa#: {mesa}</Text>
                                <Text> Forma de pago: {formaPago}</Text>
                                <ListItem
                                     onPress={ () => {
                                          navigation.navigate("EditarOrdenesMeseros",{arrayPedido:orden, idPedido:id, ordenPagada: cancelado});
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
                                {pendienteDespacho === false && (
                                        <>
                                            <CardItem>
                                                <Left><Text>Estado:</Text></Left>
                                                <Body><CheckBox checked={true} color="orange"/><Text>Cocinando...</Text></Body>    
                                            </CardItem>
                                        </>
                                    )}
                                    {pendienteDespacho === true && (
                                        <>
                                            <CardItem>
                                                <Left><Text>Estado:</Text></Left>
                                                <Body><CheckBox checked={true} color="green"/><Text>Despachar...</Text></Body>    
                                            </CardItem>
                                        </>
                                    )}
                                    {cancelado === false && (
                                        <>
                                            <CardItem>
                                                <Left><Text>Orden Pagada:</Text></Left>
                                                <Body><CheckBox checked={true} color="red"/><Text>No</Text></Body>    
                                            </CardItem>
                                        </>
                                    )}
                                    {cancelado === true && (
                                        <>
                                            <CardItem>
                                                <Left><Text>Orden Pagada:</Text></Left>
                                                <Body><CheckBox checked={true} color="green"/><Text>Si</Text></Body>    
                                            </CardItem>
                                        </>
                                    )}
                                </Content>
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
            <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />
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
    },
    logoFooter: {
        marginTop: '10%',
        paddingTop: 100,
        width: '100%',
    },
    borderOrdenes: {
        borderColor: 'black',
        borderWidth: 2,
        margin: 10
    }
})
 
export default VerOrdenesMeseros;