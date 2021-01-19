import React from 'react';
import {  Alert, StyleSheet } from 'react-native';
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

const EditarOrdenMeseros = (props) => {

    const navigation = useNavigation();

    let idPedido = props.route.params.idPedido;
    let pedidos = props.route.params.arrayPedido;

    const EliminacionCompleta = () => {
        Alert.alert(
            'Pago',
            'Confirma que se ha realizado un pago?',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {

                        try {
                            const cancelarPedido = await firebase.db.collection('ordenes')
                            .doc(idPedido)
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
                        <Text style={[globalStyles.botonTexto, { color: '#FFF'}]}>Confirmar Pago</Text>
                    </Button>
            </Content>
            <Thumbnail
                style={styles.logoFooter} 
                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
            />
            <Footer>
                <FooterTab>
                    <Button
                        onPress={ () => navigation.navigate('VerOrdenesMeseros') }
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

const styles = StyleSheet.create({

    logoFooter: {
        marginTop: '10%',
        paddingTop: 100,
        width: '100%',
    },
})
 
export default EditarOrdenMeseros;