import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    H4,
    Card,
    CardItem
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import globalStyles from '../styles/global';

import PedidoContext from '../context/pedidos/pedidosContext';

import firebase from '../firebase/firebase';

const DetallePlatillo = () => {

    // Pedido context
    const { platillo } = useContext(PedidoContext);
    const { nombre, imagen, descripcion, precio } = platillo;

    // Redireccionar
    const navigation = useNavigation();

    //Si esta logeado

    if(firebase.user.currentUser){
        return ( 
            <Container style={globalStyles.contenedor}>
                <Content style={globalStyles.contenido}>
                    <H1 style={globalStyles.titulo}>{nombre}</H1>
    
                    <Card>
                        <CardItem>
                            <Body>
                                <Image style={globalStyles.imagen} source={{ uri: imagen}} />
    
                                <Text style={{ marginTop: 20 }}>{descripcion} </Text>
                                <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
    
                <Footer>
                    <FooterTab>
                        <Button
                            style={globalStyles.boton}
                            onPress={ () => navigation.navigate("FormularioPlatillo") }
                        >
                            <Text style={globalStyles.botonTexto}>Ordenar Platillo</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
         );
    }
    return ( 
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>{nombre}</H1>

                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.imagen} source={{ uri: imagen}} />

                            <Text style={{ marginTop: 20 }}>{descripcion} </Text>
                            <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Text style={globalStyles.subtitulo}>**Para realizar el pedido es necesario hacer Login**</Text>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={ () => navigation.navigate("Login") }
                    >
                        <Text style={globalStyles.botonTexto}>Login</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
     );
    
}
 
export default DetallePlatillo;