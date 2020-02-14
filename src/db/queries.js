import Posts from './../db/models/Posts';

export const getPosts = (queryInfo = 'Posts', filter = '') => {
  let posts = Posts.allSync(filter);
  console.log('posts from query', posts);
  if (posts.length === 0) {
    return [];
  } else {
    return posts;
  }
};

export const savePosts = data => {
  Posts.write(() => {
    console.log('saving post', data);
    Posts.create('Posts', data);
    let offlinePosts = getPosts('Posts');
    console.log('all posts downloaded', [...Array.from(offlinePosts), data]);
  });
};
