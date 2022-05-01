import {
  GET_CATEGORIES,
  GET_SUB_CATEG,
  NEARBYDRIVER,
  POP_UP_DATE,
} from '../actions/types';
const initialState = {
  categories: null,
  subCategories: null,
  popupData: null,
  nearDrivers: null,
  messages: [],
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.categ,
      };
    case GET_SUB_CATEG:
      return {
        ...state,
        subCategories: action.subCateg,
      };
    case POP_UP_DATE:
      return {
        ...state,
        popupData: action.popData,
      };
    case NEARBYDRIVER:
      return {
        ...state,
        nearDrivers: action.drivers,
      };
    case 'MESSAGES':
      return {
        ...state,
        messages: action.message,
      };
    default:
      return state;
  }
};
