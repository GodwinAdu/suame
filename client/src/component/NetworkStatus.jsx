import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Spinner from './Spinner';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  useEffect(() => {
    const handleNetworkChange = () => {
      setIsOnline(navigator.onLine);
    };

    const handleConnectionChange = () => {
        if (navigator.connection && navigator.connection.downlink) {
          setIsSlowNetwork(navigator.connection.downlink < 0.6); // Adjust the threshold as per your requirements
        } else {
          setIsSlowNetwork(false); // Fallback: assume network is not slow
        }
      };

      
    const handleOnlineStatusChange = () => {
      if (navigator.onLine) {
        toast.success('Welcome back! You are now Online.', {
          duration: 3000,
          position: 'top-right',
        });
        window.location.reload(); // Reload the page when the connection is restored
      } else {
        toast.error('You are offline. Please check your internet connection.', {
          duration: 3000,
          position: 'top-right',
        });
      }
    };



    window.addEventListener('offline', handleNetworkChange);
    window.addEventListener('online', handleNetworkChange);
    window.addEventListener('change', handleConnectionChange);
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);
    // window.addEventListener('change', handleNetworkStatusChange);

    return () => {
      window.removeEventListener('offline', handleNetworkChange);
      window.removeEventListener('online', handleNetworkChange);
      window.removeEventListener('change', handleConnectionChange);
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    //   window.removeEventListener('change', handleNetworkStatusChange);
    };
  }, [isSlowNetwork]);
  return !isOnline || isSlowNetwork ? (
    <div className="flex flex-col justify-center items-center h-screen">
      {!isOnline ? (
        <Spinner message='You are offline. Please check your internet connection.' />
      ) : null}
      {isSlowNetwork ? (
        <Spinner message='Your network connection is slow. Please wait or check your internet connection.' />
      ) : null}
    </div>
  ) : null;
};

export default NetworkStatus;
