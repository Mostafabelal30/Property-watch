/* eslint-disable prettier/prettier */
import {  createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../pages/home';
import strings from '../strings';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title:strings.home,
        },
},
   },
    {
        initialRouteName: 'Home',
        mode: 'card',
        headerMode: 'screen',
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: '#3f51b5',
                 borderWidth: 1,
                 borderBottomColor: 'white' ,

                },
                headerTitleStyle:{
                    color:'#fff',
                },
                headerBackTitleStyle:{
                    color:'transparent',

                },
                headerTintColor:'#fff',
        },
    });


const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
