import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useUserStorage(key, initial) {
  const { user, get, set } = useAuth();

  const [value, setValue] = useState(() => get(key, initial));

  // Reload if user changes
  useEffect(() => {
    setValue(get(key, initial));
  }, [user?.email]);

  const update = useCallback((newValue) => {
    const resolved = typeof newValue === 'function' ? newValue(value) : newValue;
    setValue(resolved);
    set(key, resolved);
  }, [value, key, set]);

  return [value, update];
}
