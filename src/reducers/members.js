import Store from '../store/members';

export const initialState = Store;

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    case 'MEMBERTYPES_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        memberTypes: action.data,
      };
    }
    case 'MEMBERS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'MEMBERS_REPLACE': {
      let members = [];
      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        const parsed = action.data;
        const arr = [];
        for (const x in parsed) {
          arr.push(parsed[x]);
        }
        members = arr.map(item => ({
          id: item.id,
          userName: item.userName,
        }));
      }
      return {
        ...state,
        error: null,
        loading: false,
        members,
      };
    }
    default:
      return state;
  }
}
