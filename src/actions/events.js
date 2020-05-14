import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get eventTypes
  */
export function getEventTypes() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef.child('eventTypes').once('value')
    .then((snapshot) => {
      const data = snapshot.val() || [];
      return resolve(dispatch({ type: 'EVENTTYPES_REPLACE', data }));
    }).catch(reject)).catch((err) => { throw err.message; });
}

/**
  * Get events
  */
export function getEvents() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('events')
    .on('value', (snapshot) => {
      const data = snapshot.val() || [];
      return resolve(dispatch({ type: 'EVENTS_REPLACE', data }));
    })).catch((err) => { throw err.message; });
}
