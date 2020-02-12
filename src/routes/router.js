/* eslint-disable prettier/prettier */
import {  createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from '../pages/home';
import Detials from '../pages/detials';

const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            //header: null
            title:'Home',
        },
},
    Detials: {
        screen: Detials,
        navigationOptions: {
            //header: null
            title:'Detials',
        },
    },
   },
    {
        initialRouteName: 'Home',//'AuthContainer',
        mode: 'card',
        // cardStyle: {
        //     backgroundColor: '#3f51b5',
        // },
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

// Now AppContainer is the main component for React to render

export default AppContainer;
