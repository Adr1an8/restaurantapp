import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Content,
    Text,
    Body,
    Button
} from 'native-base';
import globalStyles from '../styles/global';



const Principal = () => {

    const navigation = useNavigation();


    return ( 
        
        <Container style={globalStyles.contenedor}>
                <Content style={{ backgroundColor: '#FFF' }}>
                    <Body>
                        <Text style={globalStyles.titulo}>Campina Lojana </Text>
                        <Button 
                            onPress={ () => navigation.navigate("NuevaOrden") }
                            style={globalStyles.boton}
                        >
                            <Text style={globalStyles.botonTexto}>
                                Bienvenidos
                            </Text>
                        </Button>
                    </Body>
                </Content>
        </Container>
     );
}
 
export default Principal;