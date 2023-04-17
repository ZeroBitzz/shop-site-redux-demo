import { useReducer } from 'react';
import * as actions from '../utils/actions';

const reducer = (state, action) => {
  switch (action.type) {
    case actions.UPDATE_PRODUCTS:
      return { ...state, products: action.products };
    case actions.UPDATE_CATEGORIES:
      return { ...state, categories: action.categories };
    case actions.UPDATE_CURRENT_CATEGORY:
      return { ...state, currentCategory: action.currentCategory };
    case actions.ADD_TO_CART:
      return { ...state, cartOpen: true, cart: [...state.cart, action.product] };
    case actions.ADD_MULTIPLE_TO_CART:
      return { ...state, cart: [...state.cart, ...action.products] };
    case actions.REMOVE_FROM_CART:
      return {
        ...state,
        cartOpen: state.cart.filter(product => product._id !== action._id).length > 0,
        cart: state.cart.filter(product => product._id !== action._id),
      };
    case actions.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map(product => (product._id === action._id ? { ...product, purchaseQuantity: action.purchaseQuantity } : product)),
      };
    case actions.CLEAR_CART:
      return { ...state, cartOpen: false, cart: [] };
    case actions.TOGGLE_CART:
      return { ...state, cartOpen: !state.cartOpen };
    default:
      return state;
  }
};

export const useProductReducer = initialState => useReducer(reducer, initialState);
