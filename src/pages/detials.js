import React, {Component} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {verticalScale, width, height} from '../utils/device-scaling';
import Container from '../components/Container';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const item = this.props.navigation.state.params.item;
    const {} = styles;
    console.log('itemitemitemitem', item);

    return (
      <KeyboardAwareScrollView>
        <Container style={{backgroundColor: '#fff', height: height}} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = ({auth}) => {
  const {} = auth;
  return {};
};

export default connect(
  mapStateToProps,
  {},
)(Login);
