import status from './status';
import member from './member';
import members from './members';
import chats from './chats';
import events from './events';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  members,
  events,
  chats,
};
