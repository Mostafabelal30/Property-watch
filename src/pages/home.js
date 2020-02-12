import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  I18nManager,
} from 'react-native';
import {connect} from 'react-redux';
import {getPostsList, editPost, deletePost} from '../action';
import {
  verticalScale,
  moderateScale,
  width,
  height,
  scale,
} from '../utils/device-scaling';
import Container from '../components/Container';
import strings from '../strings';
import ActionButton from 'react-native-action-button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionSheet from 'react-native-actionsheet';
import RNRestart from 'react-native-restart'; // Import package from node modules

class Home extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.deleteAndEdit = this.deleteAndEdit.bind(this);
    this.changeLang = this.changeLang.bind(this);

    this.state = {
      postId: null,
    };
  }

  componentDidMount() {
    this.props.getPostsList();
  }
  deleteAndEdit(index) {
    if (index === 0) {
      this.props.editPost(this.state.postId);
    } else if (index === 1) {
      this.props.deletePost(this.state.postId);
    }
  }
  async changeLang(index) {
    if (index === 0 && !I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      this.restart();
      // changeAppLanguage('ar');
    } else if (index === 1 && I18nManager.isRTL) {
      I18nManager.allowRTL(false);
      I18nManager.forceRTL(false);
      this.restart();
      // changeAppLanguage('en');
    }
  }
  restart = () => {
    setTimeout(() => {
      RNRestart.Restart();
    }, 250);
  };
  renderItem({item}) {
    const {radioTextStyle, contentContainerStyle, moreIconStyle} = styles;
    return (
      <View style={contentContainerStyle}>
        <TouchableOpacity
          onPress={() => {
            this.setState({postId: item.id});
            this.ActionSheet.show();
          }}
          activeOpacity={0.7}>
          <Image
            source={require('../assets/icons/more.png')}
            style={[moreIconStyle]}
          />
        </TouchableOpacity>
        <Text style={radioTextStyle}>{item.id}</Text>
        <Text style={radioTextStyle}>{item.title}</Text>
        <Text style={radioTextStyle}>{item.body}</Text>
      </View>
    );
  }
  render() {
    const {moreIconStyle, header, radioTextStyle, addPostButton} = styles;
    const options = [strings.edit, strings.delete, strings.cancel];
    const optionsLang = [strings.arabic, strings.english, strings.cancel];

    const {postList, navigation} = this.props;
    return (
      <KeyboardAwareScrollView>
        <Container>
          <View style={header}>
            <TouchableOpacity
              onPress={() => this.ActionSheetLang.show()}
              style={addPostButton}
              activeOpacity={0.7}>
              <Image
                source={require('../assets/icons/website.png')}
                style={[moreIconStyle]}
              />
              <Text style={[radioTextStyle,{marginTop:0}]}>{strings.changeLang}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {}}
              style={addPostButton}
              activeOpacity={0.7}>
              <Image
                source={require('../assets/icons/plus.png')}
                style={[moreIconStyle]}
              />
              <Text style={[radioTextStyle,{marginTop:0}]}>{strings.addPost}</Text>
            </TouchableOpacity>
          </View>
          <FlatList data={postList} renderItem={this.renderItem} />
        </Container>
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          // title={strings.changeLang}
          options={options}
          cancelButtonIndex={2}
          // destructiveButtonIndex={I18nManager.isRTL ? 0 : 1}
          onPress={index => this.deleteAndEdit(index)}
        />
        <ActionSheet
          ref={o => (this.ActionSheetLang = o)}
          // title={strings.changeLang}
          options={optionsLang}
          cancelButtonIndex={2}
          // destructiveButtonIndex={I18nManager.isRTL ? 0 : 1}
          onPress={index => this.changeLang(index)}
        />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    width: width * 0.9,
    // height: height * 0.25,
    marginVertical: width * 0.03,
    backgroundColor: '#fff',
  },
  radioTextStyle: {
    color: '#000',
    fontSize: moderateScale(30),
    textAlign: 'center',
    marginTop: verticalScale(20),
  },
  imageBackground: {
    width: width * 0.3,
    height: height * 0.2,
  },
  footer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(77),
    top: 700,
    position: 'absolute',
    backgroundColor: 'gray',
  },
  moreIconStyle: {
    width: width * 0.07,
    height: width * 0.07,
    marginHorizontal: width * 0.03,
  },
  header: {
    width: width,
    height: height * 0.1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  addPostButton: {
    width: width * 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

const mapStateToProps = ({auth}) => {
  const {postList} = auth;
  return {
    postList,
  };
};

export default connect(
  mapStateToProps,
  {
    getPostsList,
    editPost,
    deletePost,
  },
)(Home);
