import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export default function useStorage<T extends object>(key: string, emptyValue: T) {
  const [state, setState] = useState<T>(emptyValue);

  function saveStorage(value: T) {
    return new Promise((resolve, reject) => {
      const sValue = JSON.stringify(value);
      AsyncStorage.setItem(key, sValue, (error) => {
        if (!error) return reject(error);
        return resolve(true);
      });
    });
  }

  function loadStorage() {
    new Promise<T | false>((resolve, reject) => {
      AsyncStorage.getItem(key, (error, value) => {
        if (error) return reject(error);
        else if (!!value) {
          const jValue = JSON.parse(value);
          setState(jValue);
          return resolve(jValue);
        }
        resolve(false);
      });
    });
  }

  function update(value: Partial<T>) {
    setState((prevState) => {
      const newValue: T = { ...prevState, ...value };
      saveStorage(newValue);
      return prevState;
    });
  }

  function clear() {
    saveStorage(emptyValue);
  }

  // Usually for the first run.

  // Load on start
  useEffect(() => loadStorage(), []);

  return { state, update, clear };
}
