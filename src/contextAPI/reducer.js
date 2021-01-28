export const initialState = {
  token: undefined,
  user: undefined,
  recipeId: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        token: action.token,
      };
    case "ADD_FAV_LIST":
      return {
        ...state,
        recipeId: [...state.recipeId, action.item],
      };
    case "REMOVE_FAV_LIST":
      let newBasket = [...state.recipeId];
      const index = state.recipeId.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      if (index >= 0) {
        // item exists in fav, remove it..
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket`
        );
      }
      return { ...state, recipeId: newBasket };
    default:
      return state;
  }
};

export default reducer;
