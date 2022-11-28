export const INITIAL_STATE = {
  loading: false,
  user: {},
  error: false,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...INITIAL_STATE,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: true,
        user: {},
      };
    // case "UPDATE_PICTURE":
    //   return {
    //     user: {...state.user , user.profilePicture:action.payload}
    //   };

    default:
      return state;
  }
};
