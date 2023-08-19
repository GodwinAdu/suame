import React, { createContext, useContext, useState, useLayoutEffect } from 'react';
import { getUser } from '../helper/helper';
import { fetchUser } from '../utils/fetchMainUser';
import Spinner from '../component/Spinner';

const context = createContext();

export const StateContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const userMain = fetchUser();

  useLayoutEffect(() => {
    const fetchData = async () => {
      try {
        if (userMain?.email) {
          const userData = await getUser(userMain?.email);
          setUser(userData);
        }
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchData();
  }, [userMain?.email]);

  // You can add more data and functions to this context
  const contextValue = {
    user,
    // Add other properties/functions as needed
  };

  if (loading) {
    return <Spinner message='Please wait!!! We are adding new features to your page..' />; // Render a loading indicator
  }

  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  );
};

export const useStateContext = () => useContext(context);

// You can export other custom hooks for other properties/functions here
