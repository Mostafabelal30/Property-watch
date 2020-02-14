import realm from './../db/realm';
import Posts from './../db/models/Posts';
// import {getLastViewedPostSuccess} from '../screens/myCourses/actions/actions';
// import store from '../store';
// import {
//   getLastViewedCourseItem,
//   getOfflineDownloadedCourses,
// } from '../screens/myCourses/actions/actions';

export const getPosts = (queryInfo = 'Posts', filter = '') => {
  // NEW IMPLEMENTATION
  let courses = Posts.allSync(filter);
  console.log('courses from query', courses);
  if (courses.length === 0) {
    return [];
  } else {
    return courses;
  }
  //if(realm.objects(queryInfo).isEmpty()) return [];
  //const objects = realm.objects(queryInfo);

  //if(filter.length === 0) return objects;

  //return objects.filtered(filter);
};

// export const saveLastViewedCourse = (queryInfo = 'Courses', data) => {
//   console.log('data in create course', data);
//   //return;

//   Courses.all()
//     .then(courses => {
//       console.log('courses from query', courses);
//       if (courses.length === 0) {
//         console.log('courses is empty');
//         Courses.save({
//           ...data,
//           progress: data.progress_value,
//           last_course_seen: true,
//         }).then(() => {
//           store.dispatch(
//             getLastViewedCourseItem({...data, last_course_seen: true}),
//           );
//         });
//       } else {
//         console.log('i will filter and length is', courses.length);
//         let lastViewedCourseRes = courses.filtered('last_course_seen = true');
//         let downloadedCourseRes = courses.filtered(`id = ${data.id}`);
//         console.log(
//           'count of last viewed',
//           Array.from(lastViewedCourseRes).length,
//         );
//         console.log(
//           'count of downloaded',
//           Array.from(downloadedCourseRes).length,
//         );
//         let lastViewedCourse = Array.from(lastViewedCourseRes);
//         let downloadedCourse = Array.from(downloadedCourseRes);
//         if (lastViewedCourse.length > 0) {
//           store.dispatch(
//             getLastViewedCourseItem({...data, last_course_seen: true}),
//           );
//           if (lastViewedCourse[0].downloaded === true) {
//             // console.log('last viewed is downloaded and new last viewed is', data);
//             Courses.update({
//               id: lastViewedCourse[0].id,
//               last_course_seen: false,
//             }).then(() => {
//               console.log(
//                 'LAST VIEWED OLD UPDATED F',
//                 lastViewedCourse[0].title,
//               );
//               if (downloadedCourse.length > 0) {
//                 console.log(' i will updated downloaded to be last viewed');
//                 Courses.update({
//                   id: downloadedCourse[0].id,
//                   last_course_seen: true,
//                 }).then(() => {});
//               } else {
//                 console.log(' i will create last viewed and not downloaded');
//                 Courses.save({...data, last_course_seen: true}).then(() => {
//                   console.log('COURSE SAVED ALL OK');
//                 });
//               }
//             });
//           } else {
//             console.log(
//               'last viewed not downloaded before and this will be saved... ',
//               data,
//             );
//             //return;
//             if (downloadedCourse.length > 0) {
//               console.log('updating exist...');
//               console.log('download course ...', downloadedCourse);
//               console.log('updating exist...', lastViewedCourse);
//               Courses.update({
//                 id: downloadedCourse[0].id,
//                 last_course_seen: true,
//               })
//                 .then(() => {
//                   Courses.delete(lastViewedCourse[0].id).then(() => {});
//                 })
//                 .catch(err => {
//                   console.log('err happened', err);
//                 });
//             } else {
//               console.log('saving new left off and deleting old one ...');
//               Courses.save({
//                 ...data,
//                 progress: data.progress_value,
//                 last_course_seen: true,
//               }).then(() => {
//                 Courses.delete(lastViewedCourse[0].id).then(() => {
//                   console.log('OLD DELETED LAST SEEN IS OK');
//                 });
//               });
//             }
//           }
//         } else if (downloadedCourse.length > 0) {
//           console.log('downloaded before will update this', data);
//           store.dispatch(
//             getLastViewedCourseItem({...data, last_course_seen: true}),
//           );
//           Courses.update({id: data.id, last_course_seen: true}).then(() => {
//             console.log('UPDATED SUCCESSFULLY ALL OK');
//           });
//         } else {
//           console.log('brand new course to be saved', data);
//           Courses.save({
//             ...data,
//             last_course_seen: true,
//             progress: Number(data.progress_value),
//           }).then(() => {
//             store.dispatch(
//               getLastViewedCourseItem({...data, last_course_seen: true}),
//             );
//           });
//         }
//       }
//     })
//     .catch(error => {
//       console.log('error is ', error);
//     });
//   /*if(realm.length === 0) {
//         // alert('Error in create realm');
//         console.log('data in create course', data);
//         realm.write(() => {
//             //realm.deleteAll()
//             realm.create(queryInfo, data);
//             store.dispatch(getLastViewedCourseItem(data));
//         });
//     } else {

//         console.log('courses is not empty and length is ', realm.length); return;
//         let whereYouLeftOffCourse = getCourses(queryInfo, "last_course_seen = true");
//         // console.log('create in multi');
//         // alert('Error in save realm');
//         store.dispatch(getLastViewedCourseItem(data));
//         setTimeout(() => {
//             realm.write(() => {

//                     realm.delete(whereYouLeftOffCourse);
//                     realm.create(queryInfo, data);
//             });
//         }, 200);
//     }*/
// };

export const savePosts = data => {
  Posts.write(() => {
    console.log('saving downloaded course', data);
    Posts.create('Posts', data);
    let offlineCourses = getPosts('Posts');
    console.log('all courses downloaded', [
      ...Array.from(offlineCourses),
      data,
    ]);
    // store.dispatch(
    //   getOfflineDownloadedCourses([...Array.from(offlineCourses), data]),
    // );
  });
};
