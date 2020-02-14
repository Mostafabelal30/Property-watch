import Realm from 'realm';
import PostSchema from './schemas/Post';
import {Comments} from './schemas/Comment';
const realm = new Realm({
  path: 'propertyWatchApp.realm',
  schemaVersion: 2,
  schema: [PostSchema, Comments],
});

export default realm;
