import React, {useContext} from 'react';
import { Button, Text } from 'native-base';
import globalStyles from '../../styles/global';
import { useNavigation } from '@react-navigation/native'

import firebase from '../../firebase/firebase';

const BotonLogin = () => {

    const navigation = useNavigation();

    // // Leer el objeto de pedido
    // const { pedido } = useContext(PedidoContext);

    if(firebase.user.currentUser){
        return ( 
            <Button 
                onPress={ () => navigation.navigate("Logout") }
                style={globalStyles.boton}
            >
                <Text style={globalStyles.botonTexto}>{ firebase.user.currentUser.email }</Text>
            </Button>
         );
    }
     return (
        <Button 
            onPress={ () => navigation.navigate("Login") }
            style={globalStyles.boton}
        >
            <Text style={globalStyles.botonTexto}>Login</Text>
        </Button>
    );
}
 
export default BotonLogin;