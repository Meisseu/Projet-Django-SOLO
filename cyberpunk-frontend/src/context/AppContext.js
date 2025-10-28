import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiService } from '../services/api';

// Initial state
const initialState = {
  user: null,
  cart: { items: [], total_items: 0, total_price: 0 },
  categories: [],
  loading: false,
  error: null,
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  SET_CART: 'SET_CART',
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    
    case ActionTypes.SET_CART:
      return { ...state, cart: action.payload };
    
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    
    case ActionTypes.ADD_TO_CART:
      return { ...state, cart: action.payload };
    
    case ActionTypes.REMOVE_FROM_CART:
      return { ...state, cart: action.payload };
    
    case ActionTypes.UPDATE_CART_ITEM:
      return { ...state, cart: action.payload };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      
      // Load categories
      const categoriesResponse = await apiService.getCategories();
      dispatch({ type: ActionTypes.SET_CATEGORIES, payload: categoriesResponse.data });
      
      // Load cart
      const cartResponse = await apiService.getCart();
      dispatch({ type: ActionTypes.SET_CART, payload: cartResponse.data });
      
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  // Actions
  const actions = {
    setLoading: (loading) => dispatch({ type: ActionTypes.SET_LOADING, payload: loading }),
    
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    
    addToCart: async (productId, quantity = 1) => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const response = await apiService.addToCart(productId, quantity);
        dispatch({ type: ActionTypes.ADD_TO_CART, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    },
    
    removeFromCart: async (productId) => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const response = await apiService.removeFromCart(productId);
        dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    },
    
    updateCartItem: async (productId, quantity) => {
      try {
        dispatch({ type: ActionTypes.SET_LOADING, payload: true });
        const response = await apiService.updateCartItem(productId, quantity);
        dispatch({ type: ActionTypes.UPDATE_CART_ITEM, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
        throw error;
      } finally {
        dispatch({ type: ActionTypes.SET_LOADING, payload: false });
      }
    },
    
    refreshCart: async () => {
      try {
        const response = await apiService.getCart();
        dispatch({ type: ActionTypes.SET_CART, payload: response.data });
        return response.data;
      } catch (error) {
        dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
        throw error;
      }
    },
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Hook to use context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
