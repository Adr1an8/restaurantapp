import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import PagoEfectivo from './views/PagoEfectivo';
import Principal from './views/Principal';

// vista meseros 
import MenuMeseros from './views/meseros/MenuMeseros';
import VerOrdenesMeseros from './views/meseros/VerOrdenesMeseros';
import InicioMeseros from './views/meseros/InicioMeseros';
import FormularioPlatilloMeseros from './views/meseros/FormularioPlatilloMeseros';
import ResumenPedidoMeseros from './views/meseros/ResumenPedidoMeseros';
import EditarOrdenesMeseros from './views/meseros/EditarOrdenesMeseros';

//reservas 
import InicioReserva from './views/reservas/InicioReserva';
import FormularioReserva from './views/reservas/FormularioReserva';
import ResumenReserva from './views/reservas/ResumenReserva';
import ConsultaReserva from './views/reservas/ConsultaReserva';

// Components
import BotonResumen from './components/ui/BotonResumen';
import BotonResumenMeseros from './components/ui/BotonResumenMeseros';
import BotonLogin from './components/ui/BotonLogin';


//Login
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Reset from './components/Reset';
import TerminosCondiciones from './components/TerminosCondiciones';

// Pago
import PagoTarjeta from './views/PagoTarjeta';

// importar state de context
import FirebaseState from './context/firebase/firebaseState';
import FireReservaState from './context/fireReserva/fireReservaState';
import FireMeseroState from './context/fireMeseros/fireMeseroState';
import PedidoState from './context/pedidos/pedidosState';
import ReservaState from './context/reservas/reservasState';
import UserState from './context/user/userState';

import PerfilUsuario from './views/perfiles/PerfilUsuario';

const Stack = createStackNavigator();

const App = () => {

  return (
    <>
      <FirebaseState>
        <FireReservaState>
          <FireMeseroState>
          <ReservaState>
            <PedidoState>
              <UserState>
              <NavigationContainer>
                <Stack.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: '#9c4221'
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold'
                    },
                    headerTintColor: '#fff'
                  }}
                >
                  <Stack.Screen
                        name="Principal"
                        component={Principal}
                        options={{
                          title: "Principal"
                        }}
                      />
                  <Stack.Screen
                    name="NuevaOrden"
                    component={NuevaOrden}
                    options={{
                      title: "Campiña Lojana",
                      headerRight: props => <BotonLogin />
                    }}
                    
                  />
                  
                  <Stack.Screen
                    name="InicioMeseros"
                    component={InicioMeseros}
                    options={{
                      title: "Inicio",
                      headerRight: props => <BotonLogin />
                    }}
                  />

                  <Stack.Screen
                    name="MenuMeseros"
                    component={MenuMeseros}
                    options={{
                      title: "Nuestro Menú",
                      headerRight: props => <BotonResumenMeseros />
                    }}
                  />

                  <Stack.Screen
                    name="FormularioPlatilloMeseros"
                    component={FormularioPlatilloMeseros}
                    options={{
                      title: "Formulario",
                    }}
                  />

                  <Stack.Screen
                    name="ResumenPedidoMeseros"
                    component={ResumenPedidoMeseros}
                    options={{
                      title: "Resumen",
                    }}
                  />

                  <Stack.Screen
                    name="VerOrdenesMeseros"
                    component={VerOrdenesMeseros}
                    options={{
                      title: "Ordenes",
                    }}
                  />

                  <Stack.Screen
                    name="EditarOrdenesMeseros"
                    component={EditarOrdenesMeseros}
                    options={{
                      title: "Editar Orden",
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
                    name="InicioReserva"
                    component={InicioReserva}
                    options={{
                      title: "Reservaciones",
                      //headerRight: props => <BotonResumen />
                    }}
                  />

                  <Stack.Screen
                    name="FormularioReserva"
                    component={FormularioReserva}
                    options={{
                      title: "Formulario de la Reserva",
                      //headerRight: props => <BotonResumen />
                    }}
                  />

                  <Stack.Screen
                    name="ConsultaReserva"
                    component={ConsultaReserva}
                    options={{
                      title: "Consulta de la Reserva",
                      //headerRight: props => <BotonResumen />
                    }}
                  />

                  <Stack.Screen
                    name="DetallePlatillo"
                    component={DetallePlatillo}
                    options={{
                      title: "Detalle del Platillo"
                    }}
                  />

                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                      title: "Inicio de Sesión"
                    }}
                  />
                  
                  <Stack.Screen
                    name="TerminosCondiciones"
                    component={TerminosCondiciones}
                    options={{
                      title: "Términos y Condiciones"
                    }}
                  />

                  <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                      title: "Registro"
                    }}
                  />
                  <Stack.Screen
                    name="Logout"
                    component={Logout}
                    options={{
                      title: "Cerrar Sesión"
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
                      title: "Resumen del Pedido"
                    }}
                  />

                  <Stack.Screen
                    name="PagoEfectivo"
                    component={PagoEfectivo}
                    options={{
                      title: "Pago con efectivo"
                    }}
                  />
                  <Stack.Screen
                    name="ResumenReserva"
                    component={ResumenReserva}
                    options={{
                      title: "Resumen de la Reserva"
                    }}
                  />

                  <Stack.Screen
                    name="PagoTarjeta"
                    component={PagoTarjeta}
                    options={{
                      title: "Pago mediante PayPal",
                    }}
                  />

                  <Stack.Screen
                    name="Reset"
                    component={Reset}
                    options={{
                      title: "Reseteo de la contraseña",
                    }}
                  />

                  <Stack.Screen
                    name="PerfilUsuario"
                    component={PerfilUsuario}
                    options={{
                      title: "Edición del perfil del usuario",
                    }}
                  />
                </Stack.Navigator>
              </NavigationContainer>
              </UserState>
            </PedidoState>
          </ReservaState>
          </FireMeseroState>
        </FireReservaState>
      </FirebaseState>
    </>
  );
};

export default App;