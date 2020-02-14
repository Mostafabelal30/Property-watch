import React from 'react';
import realm from './../realm';

/**
 *
 */
export default class CoursesImages {
  static async save(data) {
    return new Promise((resolve, reject) => {
      realm.write(() => {
        realm.create('Images', data);
        //console.log('saving course in DB');
        return resolve();
      });
    });
  }

  static all = filter => {
    return realm.objects('Courses');
  };
}
