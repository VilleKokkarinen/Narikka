import Store from '../store/events';

export const initialState = Store;

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'EVENTTYPES_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        eventTypes: action.data,
      };
    }
    case 'EVENTS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'EVENTS_REPLACE': {
      let events = [];
      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        events = Object.values(action.data).map(item => ({
          id: item.eventId,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          details: item.details,
          info: item.info,
        }));
      }
      return {
        ...state,
        error: null,
        loading: false,
        events,
      };
    }
    default:
      return state;
  }
}
