import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
  ScrollView,
  Button,
} from 'react-native';

import firebase from 'firebase';
var userPhoto;
firebase.auth().onAuthStateChanged(function(user) {
  userPhoto = user.photoURL;
});

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Login from './src/screens/Auth/Login';
import Registr from './src/screens/Auth/Registr';
import HomeScreen from './src/screens/Tabs/HomeScreen';
import HomeDetail from './src/screens/Tabs/HomeDetail';
import Users from './src/screens/Tabs/Users';
import SettingDetail from './src/screens/Tabs/SettingDetail';
import GeneralChat from './src/screens/Drawers/GeneralChat';
import ChatPage from './src/screens/ChatPage';
import Profile from './src/screens/Drawers/Profile';
import MovieSearch from './src/screens/Drawers/MovieSearch';
import Calc from './src/screens/Drawers/Calc';
const StackApp = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator drawerContent={props => CustomDrawerContent(props)}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="SettingDetail" component={SettingDetail} />
      <Drawer.Screen name="HomeDetail" component={HomeDetail} />
      <Drawer.Screen name="GeneralChat" component={GeneralChat} />
      <Drawer.Screen name="ChatPage" component={ChatPage} />
      <Drawer.Screen name="MovieSearch" component={MovieSearch} />
      <Drawer.Screen name="Calc" component={Calc} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Exit" component={Login} />
    </Drawer.Navigator>
  );
}
function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{margin: 5, alignItems: 'center'}}>
        <Image
          source={{uri: userPhoto}}
          style={{height: 70, width: 70, borderRadius: 35}}
        />
      </View>
      <ScrollView style={{marginLeft: 5}}>
        <TouchableOpacity
          style={{marginTop: 20, flexDirection: 'row', margin: 5}}
          onPress={() => props.navigation.navigate('HomeScreen')}>
          <Image
            source={require('./src/Images/home.png')}
            style={{height: 20, width: 20}}
          />
          <Text> Home</Text>
        </TouchableOpacity>
        <Text style={{marginTop: 20, color: 'red'}}>Pages</Text>
        <TouchableOpacity
          style={{marginTop: 10}}
          onPress={() => props.navigation.navigate('SettingDetail')}>
          <Text>SettingDetail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('HomeDetail')}>
          <Text>HomeDetail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('MovieSearch')}>
          <Text>MovieSearch</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('Calc')}>
          <Text>Calculator</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('GeneralChat')}>
          <Text>GeneralChat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('Profile')}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('Login')}>
          <Text>Exit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'HomeScreen') {
            iconName = focused
              ? require('./src/Images/home.png')
              : require('./src/Images/home2.png');
          } else if (route.name === 'Users') {
            iconName = focused
              ? require('./src/Images/group.png')
              : require('./src/Images/group1.png');
          }
          return <Image source={iconName} style={{width: 20, height: 20}} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          headerShown: true,
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        })}
      />
      <Tab.Screen name="Users" component={Users} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StackApp.Navigator initialRouteName="Login">
          <StackApp.Screen
            name="DrawerNavigation"
            component={DrawerNavigation}
            options={() => ({headerShown: false})}
          />
          <StackApp.Screen
            name="Login"
            component={Login}
            options={() => ({headerShown: false})}
          />
          <StackApp.Screen
            name="Registr"
            component={Registr}
            options={() => ({headerShown: false})}
          />
        </StackApp.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});