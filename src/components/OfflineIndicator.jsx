import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showIndicator && isOnline) return null;

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 ${
      isOnline ? 'bg-green-500' : 'bg-red-500'
    } text-white transition-all duration-300`}>
      {isOnline ? (
        <>
          <Wifi className="h-5 w-5" />
          <span className="font-medium">Back Online</span>
        </>
      ) : (
        <>
          <WifiOff className="h-5 w-5" />
          <span className="font-medium">You are offline</span>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;