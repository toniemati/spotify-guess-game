export const initialState = {
  user: null,
  playlists: []
};

const reducer = (state, action) => {
  console.log('Action 💚:', action);

  switch (action.type) {
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