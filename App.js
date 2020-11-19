import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

import FormularioReserva from './views/FormularioReserva';
import ResumenReserva from './views/ResumenReserva';

// Components
import BotonResumen from './components/ui/BotonResumen';

//Login
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

// importar state de context
import FirebaseState from './context/firebase/firebaseState';
import FireReservaState from './context/fireReserva/fireReservaState';
import PedidoState from './context/pedidos/pedidosState';
import ReservaState from './context/reservas/reservasState';


const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <FireReservaState>
          <ReservaState>
            <PedidoState>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#FFDA00'
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold'
                    },
                    headerTintColor: '#000'
                  }}
                >
                  
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      title: "Login"
                    }}
                  />
                  <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                      title: "Register"
                    }}
                  />
                  <Stack.Screen
                    name="Logout"
                    component={Logout}
                    options={{
                      title: "Logout"
                    }}
                  />
                  <Stack.Screen
                    name="NuevaOrden"
                    component={NuevaOrden}
                    options={{
                      title: "Campiña Lojana"
                    }}
                  />

                  <Stack.Screen
                    name="Menu"
                    component={Menu}
                    options={{
                      title: "Nuestro Menú",
                      headerRight: props => <BotonResumen />
                    }}
                  />

                  <Stack.Screen
                    name="FormularioReserva"
                    component={FormularioReserva}
                    options={{
                      title: "Formulario Reserva",
                      //headerRight: props => <BotonResumen />
                    }}
                  />

                  <Stack.Screen
                    name="DetallePlatillo"
                    component={DetallePlatillo}
                    options={{
                      title: "Detalle Platillo"
                    }}
                  />

                  <Stack.Screen
                    name="FormularioPlatillo"
                    component={FormularioPlatillo}
                    options={{
                      title: "Ordenar Platillo"
                    }}
                  />

                  <Stack.Screen
                    name="ResumenPedido"
                    component={ResumenPedido}
                    options={{
                      title: "Resumen Pedido"
                    }}
                  />

                  <Stack.Screen
                    name="ProgresoPedido"
                    component={ProgresoPedido}
                    options={{
                      title: "Progreso de Pedido"
                    }}
                  />
                  <Stack.Screen
                    name="ResumenReserva"
                    component={ResumenReserva}
                    options={{
                      title: "Resumen Reserva"
                    }}
                  />

                </Stack.Navigator>
              </NavigationContainer>
            </PedidoState>
          </ReservaState>
        </FireReservaState>
      </FirebaseState>
    </>
  );
};


export default App;
