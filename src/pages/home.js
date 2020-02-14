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
import {
  getPostsList,
  getCommentsList,
  editPost,
  deletePost,
  postPropChanged,
  addPost,
} from '../action';
import {
  verticalScale,
  moderateScale,
  width,
  height,
  scale,
} from '../utils/device-scaling';
import Container from '../components/Container';
import strings from '../strings';
import ActionSheet from 'react-native-actionsheet';
import RNRestart from 'react-native-restart'; // Import package from node modules
import Modal from 'react-native-modal';
import Input from '../components/Input';
import Comment from '../components/Comment';
import Posts from '../db/models/Posts';
import {getPosts, savePosts} from '../db/queries';

class Home extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.deleteAndEdit = this.deleteAndEdit.bind(this);
    this.changeLang = this.changeLang.bind(this);

    this.state = {
      postObject: null,
      visible: false,
      edit: false,
    };
  }

  componentDidMount() {
    // Posts.allSync().then(courses => {
    //   console.log('courses from query', courses);
    // });
    // let courses = Posts.allSync();
    // console.log('componentDidMount', isConnected);
    this.props.getPostsList();
    this.props.getCommentsList();

    // .then(() => Posts.save(this.props.postList))
    // .catch(function(err) {
    //   console.log('getPostsListgetPostsList', err.response);
    //   return err;
    // });
    // let x = getPosts();

    // getPosts().then(res => {
    //   console.log('resresresresresres', res);
    //   // Posts.save(this.props.postList);
    // });
    // console.log('courses from query', Array.from(courses));
  }
  deleteAndEdit(index) {
    if (index === 0) {
      this.setState({visible: true, edit: true});
      this.props.postPropChanged('title', this.state.postObject.title);
      this.props.postPropChanged('body', this.state.postObject.body);
    } else if (index === 1) {
      this.props.deletePost(this.state.postObject.id);
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
    const {commentList} = this.props;
    const arr = commentList.filter(function(comment, i) {
      return comment.postId === item.id;
    });
    return (
      <View style={contentContainerStyle}>
        <TouchableOpacity
          onPress={() => {
            this.setState({postObject: item});
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
        {/* {commentList.length>0?<Text>comments</Text>:null} */}
        {/* {commentList.map((comment, index) => { */}
        {/* if (comment.postId === item.id) return  */}
        {arr.length > 0 ? <Comment comment={arr[0]} /> : null}
      </View>
    );
  }

  hideModal() {
    this.setState({visible: false});
    this.props.postPropChanged('title', '');
    this.props.postPropChanged('body', '');
  }

  render() {
    const {
      moreIconStyle,
      header,
      radioTextStyle,
      addPostButton,
      addPostContainerStyle,
      addPostModalStyle,
      addPostTextStyle,
      addPostTitleStyle,
      addPostTitleViewStyle,
      addPostViewStyle,
      modalStyle,
      buttonContainerStyle,
      cancelTextStyle,
      TextInputStyle,
      inputStyle,
    } = styles;
    const options = [strings.edit, strings.delete, strings.cancel];
    const optionsLang = [strings.arabic, strings.english, strings.cancel];

    const {
      postList,
      title,
      body,
      postPropChanged,
      addPost,
      editPost,
    } = this.props;
    return (
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
            <Text style={[radioTextStyle, {marginTop: 0}]}>
              {strings.changeLang}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.setState({visible: true, edit: false})}
            style={addPostButton}
            activeOpacity={0.7}>
            <Image
              source={require('../assets/icons/plus.png')}
              style={[moreIconStyle]}
            />
            <Text style={[radioTextStyle, {marginTop: 0}]}>
              {strings.addPost}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList data={postList} renderItem={this.renderItem} />

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
          title={strings.changeLang}
          options={optionsLang}
          cancelButtonIndex={2}
          destructiveButtonIndex={I18nManager.isRTL ? 0 : 1}
          onPress={index => this.changeLang(index)}
        />

        <Modal
          isVisible={this.state.visible}
          onBackButtonPress={() => this.setState({visible: false})}
          onBackdropPress={() => this.setState({visible: false})}
          // animationType="slide"
          // transparent={true}
          style={modalStyle}>
          <View style={addPostModalStyle}>
            <View style={addPostContainerStyle}>
              <View style={addPostTitleViewStyle}>
                <Text style={addPostTitleStyle}>{strings.addPost}</Text>
              </View>
              <Input
                value={title}
                placeholder={strings.title}
                onChangeText={title => postPropChanged('title', title)}
                returnKeyType={'done'}
                containerStyle={TextInputStyle}
                inputStyle={inputStyle}
                // multiline={true}
              />
              <Input
                value={body}
                placeholder={strings.addPost}
                onChangeText={body => postPropChanged('body', body)}
                returnKeyType={'done'}
                containerStyle={TextInputStyle}
                inputStyle={inputStyle}
                // multiline={true}
              />

              <View style={buttonContainerStyle}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({visible: false});
                    this.state.edit
                      ? editPost(this.state.postObject.id)
                      : addPost();
                  }}
                  style={[addPostViewStyle, {backgroundColor: '#F0BC5E'}]}>
                  <Text style={addPostTextStyle}>{strings.addPost}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.hideModal()}
                  style={addPostViewStyle}>
                  <Text style={cancelTextStyle}>{strings.cancel}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
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

  addPostViewStyle: {
    width: width * 0.25,
    height: height * 0.07,
    borderRadius: scale(22),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    marginHorizontal: verticalScale(22),
  },
  addPostTextStyle: {
    fontSize: moderateScale(33),
    color: '#fff',
  },
  cancelTextStyle: {
    fontSize: moderateScale(33),
    color: '#000000',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    marginTop: verticalScale(44),
  },
  addPostTitleStyle: {
    fontSize: moderateScale(55),
    color: '#000000',
  },
  addPostTitleViewStyle: {
    width: width * 0.5,
    height: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPostContainerStyle: {
    width: width * 0.9,
    padding: scale(33),
    backgroundColor: '#FFFFFF',
    height: verticalScale(666),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(15),
  },
  addPostModalStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalStyle: {
    // width:width*.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextInputStyle: {
    marginVertical: scale(22),
    width: width * 0.7,
    borderRadius: scale(22),
    height: height * 0.07,
  },
  inputStyle: {
    fontSize: moderateScale(44),
    color: '#F0BC5E',
  },
});

const mapStateToProps = ({post}) => {
  const {postList, title, body, commentList} = post;
  return {
    commentList,
    postList,
    title,
    body,
  };
};

export default connect(
  mapStateToProps,
  {
    getPostsList,
    getCommentsList,
    editPost,
    deletePost,
    postPropChanged,
    addPost,
  },
)(Home);
