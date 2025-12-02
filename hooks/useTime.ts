import { useState, useEffect, useRef } from 'react';

/**
 * Returns the current global system time.
 * Components are responsible for converting this to their specific timezone.
 */
export const useTime = (): Date => {
  const [now, setNow] = useState<Date>(new Date());
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      setNow(new Date());
      frameRef.current = requestAnimationFrame(update);
    };

    frameRef.current = requestAnimationFrame(update);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return now;
};