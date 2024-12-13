/*import * as React from 'react';
import { useFonts } from "expo-font";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '@/src/screens/WelcomeScreen';
import HomeScreen from '@/src/screens/HomeScreen';
import AuthScreen from '@/src/screens/AuthScreen';
import PantallaBotonIdentificar from '@/src/screens/PantallaBotonIdentificar';
import PantallaBotonViolencia from '@/src/screens/PantallaBotonViolencia';
import PantallaBotonQueHacer from '@/src/screens/PantallaBotonQueHacer';
import PantallaBotonDenuncia from '@/src/screens/PantallaBotonDenuncia';
import PantallaCrud from '@/src/screens/PantallaCrud';



import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();



function AppNavigation() {

    useFonts({
        'poppins-bold':require('@/assets/fonts/Poppins-Bold.ttf'),
    
        'poppins-medium':require('@/assets/fonts/Poppins-MediumItalic.ttf'),
    
        'poppins-regular':require('@/assets/fonts/Poppins-Regular.ttf')
      })


    return (
        <GestureHandlerRootView>
            <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}} >
                <Stack.Screen name="Home" component={HomeScreen} ></Stack.Screen>
                <Stack.Screen name="Welcome" component={WelcomeScreen}></Stack.Screen>
                <Stack.Screen name="Auth" component={AuthScreen} ></Stack.Screen>
                <Stack.Screen name="Identificar" component={PantallaBotonIdentificar} ></Stack.Screen>
                <Stack.Screen name="Violencia" component={PantallaBotonViolencia} ></Stack.Screen>
                <Stack.Screen name="QueHacer" component={PantallaBotonQueHacer} ></Stack.Screen>
                <Stack.Screen name="Denuncia" component={PantallaBotonDenuncia} ></Stack.Screen>
                <Stack.Screen name="Crud" component={PantallaCrud} ></Stack.Screen>

            </Stack.Navigator>
        </GestureHandlerRootView>
    );
}

export default AppNavigation;
*/