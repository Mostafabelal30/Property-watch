import React from 'react';
import realm from '../realm';

export default class Posts {
  static async save(Post) {
    return new Promise((resolve, reject) => {
      realm
        .write(() => {
          console.log('Post . . . ', Post);
          Post.map(obj => {
            const {id, title, body, userId} = obj;
            if (id && title && body && userId) {
              realm.create('Posts', {
                id,
                title,
                body,
                userId,
              });
            }
          });
          console.log('saving Post in DB');

          return resolve();
        })
        .catch(() => {});
    });
  }
  static async saveComment(Comment) {
    return new Promise((resolve, reject) => {
      realm
        .write(() => {
          console.log('Comment . . . ', Comment);
          Comment.map(obj => {
            const {id, name, email, body, postId} = obj;
            if (id && name && email && body && postId) {
              realm.create('Comments', {
                id,
                name,
                email,
                body,
                postId,
              });
            }
          });
          console.log('saving Comment in DB');

          return resolve();
        })
        .catch(() => {});
    });
  }

  static async update(Post) {
    return new Promise((resolve, reject) => {
      console.log('UPDATING');
      let PostObj = realm.objectForPrimaryKey('Posts', Post.id);
      if (PostObj !== undefined && Post.hasOwnProperty('downloaded')) {
        realm.write(() => {
          console.log('will update download in ', Post.id);
          PostObj.downloaded = true;
          if (Post.hasOwnProperty('path')) {
            PostObj.path = Post.path;
          }
          resolve();
        });
      } else if (
        PostObj !== undefined &&
        Post.hasOwnProperty('last_Post_seen')
      ) {
        realm.write(() => {
          console.log('will update last seen in ', Post.id);
          PostObj.last_Post_seen = Post.last_Post_seen;
          resolve();
        });
      }
    });
  }

  static async delete(id) {
    return new Promise((resolve, reject) => {
      this.PostItemRealm(id).then(Post => {
        realm.write(() => {
          realm.delete(Post);
          console.log('Post DELETED OK');
          resolve();
        });
      });
    });
  }

  static async all(filter = '') {
    // TODO: implement apply filter if passed
    return new Promise((resolve, reject) => {
      if (filter.length === 0) return resolve(realm.objects('Posts'));

      return resolve(realm.objects('Posts').filtered(filter));
      // alert(JSON.stringify(Posts))
      // return resolve(Posts);
    });
  }

  static allSync = (filter = '') => {
    if (filter.length === 0) return realm.objects('Posts');
    const Posts = realm.objects('Posts').filtered(filter);
    console.log('PostsPostsPostsPostsPostsPosts', Posts);

    return realm.objects('Posts').filtered(filter);
  };

  static allSyncComment = (filter = '') => {
    if (filter.length === 0) return realm.objects('Comments');
    const Comment = realm.objects('Comments').filtered(filter);
    console.log('CommentCommentComment', Comment);

    return realm.objects('Comments').filtered(filter);
  };

  static async PostItemRealm(filter) {
    // TODO: implement apply filter if passed
    return new Promise((resolve, reject) => {
      const Posts = realm.objects('Posts').filtered(`id = ${filter}`);
      return resolve(Posts);
    });
  }

  static async removePost(Post) {
    // TODO: implement apply filter if passed
    return new Promise((resolve, reject) => {
      const Posts = realm.objects('Posts').filtered(`id = ${Post.id}`);
      realm.delete(Posts);
      // alert(JSON.stringify(Posts))
      return resolve(Posts);
    });
  }
}
