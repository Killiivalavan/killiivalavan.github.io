import { useState, useEffect } from 'react';

/**
 * Shared hook that returns the current time in IST (Asia/Kolkata).
 * Updates every minute. Returns an empty string on the server to avoid hydration mismatches.
 */
export function useIndiaTime(): string {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const indiaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const hours = indiaTime.getHours().toString().padStart(2, '0');
      const minutes = indiaTime.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}${minutes} hrs`);
    };

    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
}
