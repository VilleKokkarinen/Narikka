import Store from '../store/chats';

export const initialState = Store;
export default function chatReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHATS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'CHATS_REPLACE': {
      let chats = [];
      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        chats = Object.values(action.data).map(item => ({
          id: item.chat.id,
          name: item.chat.name,
          messages: Object.values(item.chat.messages).map(message => ({
            id: message.id,
            message: message.messagetext,
            timestamp: message.timestamp,
            author: message.author,
          })) || {},
          authorizedUsers: Object.values(item.chat.authorizedUsers).map(user => ({
            id: user.id,
            userName: user.userName,
          })),
        }));
      }
      return {
        ...state,
        error: null,
        loading: false,
        chats,
      };
    }
    default:
      return state;
  }
}
