import { useState, useEffect } from "react";
import { Dispatch, SetStateAction } from "react";

type SessionStorage<T> = [
  T | undefined,
  Dispatch<SetStateAction<T | undefined>>
];

export const useSessionStorage = <T>(
  key: string,
  initialValue?: T
): SessionStorage<T> => {
  const [storedValue, setStoredValue] = useState<T | undefined>(() => {
    if (!initialValue) return;
    try {
      const value = sessionStorage.getItem(key);
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (storedValue) {
      try {
        sessionStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.log(error);
      }
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
};
