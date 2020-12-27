import React, {useContext, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import {
    Container,
    Content,
    Text,
    Body,
    Button
} from 'native-base';
import globalStyles from '../styles/global';

import  UserContext from '../context/user/userContext';

import firebase from '../firebase/firebase';


const Principal = () => {

    const navigation = useNavigation();

    const { user, obtenerUsuarios } = useContext(UserContext);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const CorreoUsuarios = user.map((usuario) =>{
        const correo  = usuario.correo;
        return correo;
    });

    if(firebase.user.currentUser){
        if(CorreoUsuarios.includes(firebase.user.currentUser.email)){
            return ( 
                <Container style={globalStyles.contenedor}>
                        <Content style={{ backgroundColor: '#FFF' }}>
                            <Body>
                                <Text style={globalStyles.titulo}>Campina Lojana </Text>
                                <Button 
                                    onPress={ () => navigation.navigate("InicioMeseros") }
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
    }

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