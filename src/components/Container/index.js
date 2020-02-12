import React from 'react';
import {View, SafeAreaView} from 'react-native';
import {width} from '../../utils/device-scaling';
// import AppNetInfo from '../AppNetInfo'

export default (Container = props => {
  return (
    <View
      style={[
        {flex: 1, backgroundColor: '#F6F4F5', alignItems: 'center'},
        props.style,
      ]}>
      <SafeAreaView style={{flex: 1, width, alignItems: 'center'}}>
        {/* <AppNetInfo /> */}
        {props.children}
      </SafeAreaView>
    </View>
  );
});
