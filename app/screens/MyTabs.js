import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddCustomer from './AddCustomer';
import AddVehicle from './AddVehicle';
import AddRental from './AddRental';
import ReturnVehicle from './ReturnVehicle';
import ListCustomer from './ListCustomer';
import ListVehicle from './ListVehicle';

const Tab = createBottomTabNavigator();

class MyTabs extends React.Component {

    render(){
        return (
            <Tab.Navigator>
            <Tab.Screen name="Customer" component={AddCustomer} />
            <Tab.Screen name="Vehicle" component={AddVehicle} />
            <Tab.Screen name="Rental" component={AddRental} />
            <Tab.Screen name="ReturnVehicle" component={ReturnVehicle} />
            <Tab.Screen name="ListCustomer" component={ListCustomer} />
            <Tab.Screen name="ListVehicle" component={ListVehicle} />
          </Tab.Navigator>
        );
    }
}

export default MyTabs;

// function MyTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Settings" component={SettingsScreen} />
//     </Tab.Navigator>
//   );
// }