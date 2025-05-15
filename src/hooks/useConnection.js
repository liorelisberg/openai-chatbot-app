import { useState, useEffect } from 'react';
import { checkConnection } from '../services/chatService';

/**
 * Hook to track network connectivity
 * @returns {boolean} - Whether the device is connected to the internet
 */
export const useConnection = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const checkNetworkStatus = async () => {
      const status = await checkConnection();
      setIsConnected(status);
    };

    // Check connection on mount
    checkNetworkStatus();

    // Set up interval to check connection periodically
    const intervalId = setInterval(checkNetworkStatus, 30000); // Check every 30 seconds

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return isConnected;
};
