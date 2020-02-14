import React from 'react';

export class Comments {}

Comments.schema = {
  name: 'Comments',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    email: 'string',
    body: 'string',
    postId: 'int',
  },
};
