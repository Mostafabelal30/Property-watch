import React from 'react';

export default class PostSchema {}

PostSchema.schema = {
  name: 'Posts',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    body: 'string',
    userId: 'int',
  },
};
