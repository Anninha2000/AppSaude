import Login from './abas/Login';
import PaginaPrincipal from './abas/PaginaPrincipal';
import Receitas from './abas/Receitas';
import Dicas from './abas/Dicas';
import Registro from './abas/Registro';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { View } from 'react-native';
import { useState } from 'react';

function Abas({ route, registro, adionaRegistro, navigation,concluirTarefa }) {
  const routeParams = route.params;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 70,
          borderRadius: 20,
          paddingTop: 10,
          paddingBottom: 10,
          borderWidth: 1,
          borderColor: '#F0F0F0',
          marginHorizontal: 20,
          marginBottom: 40,
          backgroundColor: '#FFFFFF',
          elevation: 10,
        },
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="PaginaPrincipal"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="home" size={30} color={color} />
            </View>
          ),
        }}>
        {(props) => (
          <PaginaPrincipal
            {...props}
            registro={registro}
            routeParams={routeParams}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Receitas"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={30} color={color} />
          ),
        }}>
        {(props) => (
          <Receitas {...props} registro={registro} concluirTarefa={concluirTarefa} routeParams={routeParams} />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Registro"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={['#3B82F6', '#8B5CF6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style=
              {{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: '#4A90E2',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -30,
                elevation: 5,
                shadowColor: '#4A90E2',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
              }}
              >
              <Ionicons name="add" size={30} color="white" />
            </LinearGradient>
          ),
        }}>
        {(props) => (
          <Registro
            {...props}
            adionaRegistro={adionaRegistro}
            routeParams={routeParams}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Dicas"
        component={Dicas}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default function App() {
  const [registro, setRegistro] = useState([]);
  const adicionarRegistro = (novoRegistro) => {
    setRegistro((lista) => [...lista, novoRegistro]);
  };

   const tarefaConcluida =(id)=>{
   setRegistro(registroAtuais => registroAtuais.map(item=>
   item.id == id ?
      {...item, concluida:!item.concluida} : item
   ));
 };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PaginaPrincipal" options={{ headerShown: false }}>
          {(props) => (
            <Abas
              {...props}
              registro={registro}
              adionaRegistro={adicionarRegistro}
              concluirTarefa={tarefaConcluida}
              
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
