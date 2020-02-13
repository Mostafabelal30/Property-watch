import React from 'react';
import {
  ImageBackground,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  TextInput,
  I18nManager,
} from 'react-native';
import {
  width,
  verticalScale,
  scale,
  moderateScale,
  height,
} from '../../utils/device-scaling';
import colors from '../../config/colors';

export default (Comment = props => {
  const {
    commentView,
    containerTopicComment,
    creatorImageContainer,
    creatorName,
    bodyComment,
  } = styles;
  const {comment} = props;
  return (
    <View style={containerTopicComment}>
      {/* <View style={creatorImageContainer}>
        <Text style={creatorName}>{comment.name}</Text>
      </View> */}
      <View style={commentView}>
        <Text style={creatorName}>{comment.name}</Text>
        <Text style={creatorName}>{comment.email}</Text>
        <Text style={bodyComment}>{comment.body}</Text>
      </View>
    </View>
  );
});

const styles = {
  containerTopicComment: {
    flexDirection: 'row',
    marginTop: height * 0.05,
  },
  creatorImageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: height * 0.05,
  },
  commentView: {
    flex: 1,
    minHeight: height * 0.05,
    margin: width * 0.05,
    backgroundColor: colors.white1,
    borderRadius: width * 0.05,
    marginTop: 0,
  },
  creatorName: {
    fontSize: width * 0.035,
    margin: width * 0.05,
    color: colors.black0,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  bodyComment: {
    alignSelf: 'stretch',
    margin: width * 0.05,
    color: colors.gray02,
    marginTop: height * 0.02,
  },
};
