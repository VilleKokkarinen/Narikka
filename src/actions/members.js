import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get memberTypes
  */
export function getMemberTypes() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('memberTypes').once('value')
    .then((snapshot) => {
      const memberTypes = snapshot.val() || [];

      return resolve(dispatch({
        type: 'MEMBERTYPES_REPLACE',
        data: memberTypes,
      }));
    }).catch(reject)).catch(e => console.log(e));
}

/**
  * Get Members
  */
export function getMembers() {
  if (Firebase === null) return () => new Promise(resolve => resolve());
  return dispatch => new Promise(resolve => FirebaseRef.child('users')
    .on('value', (snapshot) => {
      const members = snapshot.val() || [];
      return resolve(dispatch({
        type: 'MEMBERS_REPLACE',
        data: members,
      }));
    })).catch(e => console.log(e));
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'MEMBERS_ERROR',
    data: message,
  })));
}
