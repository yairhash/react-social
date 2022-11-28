export const INITIAL_STATE = {
  loading: false,
  posts: [],
  error: false,
};

export const postReducer = (state, action) => {
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
        posts: action.payload,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: true,
        posts: [],
      };
    default:
      return state;
  }
};
