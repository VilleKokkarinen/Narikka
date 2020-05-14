import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get Chats
  */
export async function getUserData(users) {
  const pArray = Object.values(users).map(async (user) => {
    const response = await FirebaseRef.child('users').child(user.id)
      .once('value').then((snapshot) => {
        const data = snapshot.val();
        return data;
      })
      .catch(() => null);
    return response;
  });
  const usersarray = await Promise.all(pArray);
  return usersarray;
}
export async function getMessages(chatId) {
  const response = await FirebaseRef.child('chat-messages').child(chatId)
    .once('value').then((snapshot) => {
      const data = snapshot.val();
      return Object.values(data);
    })
    .catch(() => null);
  const final = await response;
  return final;
}
export async function getChatData(chatId) {
  const response = await FirebaseRef.child('chats').child(chatId)
    .once('value').then(async (snapshot) => {
      const data = snapshot.val();
      const authorizedUsers = await getUserData(data.authorizedUsers);
      const messages = await getMessages(data.chatId);
      const chat = {
        id: data.chatId,
        name: data.name,
        authorizedUsers,
        messages,
      };

      return chat;
    })
    .catch(() => null);
  const final = await response;
  return final;
}
export function getChats(userId) {
  if (Firebase === null) return () => new Promise(resolve => resolve());
  return dispatch => new Promise(resolve => FirebaseRef.child('user-chats').child(userId)
    .on('value', async (snapshot) => {
      const data = snapshot.val() || null;
      if (data !== null) {
        const chats = Object.values(data.chats).map(async item => ({
          chat: await getChatData(item.id),
        }));
        const readychats = await Promise.all(chats);
        const finalized = [];
        readychats.forEach((chat) => {
          if (chat.chat.messages !== null) {
            finalized.push(chat);
          }
        });
        const finalData = await Promise.all(finalized);
        if (finalData.length >= 1) {
          resolve(dispatch({
            type: 'CHATS_REPLACE',
            data: finalData,
          }));
        }
      }
    })).catch(() => null);
}
