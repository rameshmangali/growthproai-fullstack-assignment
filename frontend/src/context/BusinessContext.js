import React, { createContext, useContext, useReducer } from 'react';

const BusinessContext = createContext();

const businessReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_BUSINESS_DATA':
      return { ...state, businessData: action.payload, loading: false };
    case 'UPDATE_HEADLINE':
      return {
        ...state,
        businessData: { ...state.businessData, headline: action.payload },
        loading: false,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  businessData: null,
  loading: false,
  error: null,
};

export const BusinessProvider = ({ children }) => {
  const [state, dispatch] = useReducer(businessReducer, initialState);

  const API_BASE = process.env.REACT_APP_API_URL;
  console.log('API_BASE:', API_BASE);

  const fetchBusinessData = async (formData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const response = await fetch(`${API_BASE}/business-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to fetch business data');

      const data = await response.json();
      dispatch({
        type: 'SET_BUSINESS_DATA',
        payload: { ...data, ...formData },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const regenerateHeadline = async () => {
    if (!state.businessData) return;

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const { name, location } = state.businessData;
      const response = await fetch(
        `${API_BASE}/regenerate-headline?name=${encodeURIComponent(
          name
        )}&location=${encodeURIComponent(location)}`
      );

      if (!response.ok) throw new Error('Failed to regenerate headline');

      const data = await response.json();
      dispatch({ type: 'UPDATE_HEADLINE', payload: data.headline });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const value = {
    ...state,
    fetchBusinessData,
    regenerateHeadline,
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
