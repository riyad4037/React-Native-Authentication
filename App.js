import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screen/LoginScreen';
import HomeScreen from './Screen/HomeScreen';
import VaccineList from './Screen/Vaccine_list';
import VaccineUpdate from './Screen/UpdateVaccine';
import Hospital from './Screen/Hospital_list';
import HospitalUpdate from './Screen/Hospital_update';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen 
          name = 'Login'
          component={LoginScreen}
        />
        <Stack.Screen 
          name = 'Home'
          component={HomeScreen}
        />
        <Stack.Screen 
          name = 'Vaccine'
          component={VaccineList}
        />
        <Stack.Screen 
          name = 'VaccineUpdate'
          component={VaccineUpdate}
        />
        <Stack.Screen 
          name = 'Hospital'
          component={Hospital}
        />
        <Stack.Screen 
          name = 'HospitalUpdate'
          component={HospitalUpdate}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
