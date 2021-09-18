export const initialState = {
  token: null,
  user: null,
  playlists: []
};

const reducer = (state, action) => {
  console.log(`🐢 ${action.type}:`, action.payload);

  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload
      }

    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }

    case 'SET_PLAYLISTS':
      return { 
        ...state,
        playlists: action.payload
      };

    default:
      return state;
  }
}

export default reducer;