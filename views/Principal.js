import React, {useContext, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native'
import {
    Container,
    Content,
    Text,
    Body,
    Button,
    Thumbnail
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
                            <Thumbnail
                                style={styles.logo} 
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c' }} 
                            />
                            <Body>
                                <Button 
                                    onPress={ () => navigation.navigate("InicioMeseros") }
                                    style={globalStyles.boton}
                                >
                                    <Text style={globalStyles.botonTexto}>
                                        Bienvenidos
                                    </Text>
                                </Button>
                            </Body>
                            <Thumbnail
                                style={styles.logoFooter} 
                                source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                            />
                        </Content>
                </Container>
             );
        }
    }

    return ( 
        
        <Container style={globalStyles.contenedor}>
                <Content style={{ backgroundColor: '#FFF' }}>
                    <Thumbnail
                        style={styles.logo} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-1.png?alt=media&token=2b54a5df-01e6-4280-9d30-a42dfad39c6c' }} 
                    />
                    <Body>
                        
                        <Button 
                            onPress={ () => navigation.navigate("NuevaOrden") }
                            style={globalStyles.boton}
                        >
                            <Text style={globalStyles.botonTexto}>
                                Bienvenidos
                            </Text>
                        </Button>
                    </Body>
                    <Thumbnail
                        style={styles.logoFooter} 
                        source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/restaurant-fc4d0.appspot.com/o/la-campi%C3%B1alogo-dise%C3%B1os-b.png?alt=media&token=92f465d6-74c2-4e41-8bdb-c38485436fc6' }} 
                    />
                </Content>
        </Container>
     );
}

const styles = StyleSheet.create({
    logo: {
        
        width: '100%',
        height: 200,
        marginBottom: '10%',
        marginTop: '10%'
      
    },
    logoFooter: {
        marginTop: '15%',
        paddingTop: 100,
        width: '100%',
    },
  });

export default Principal;