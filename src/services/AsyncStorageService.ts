import AsyncStorage from '@react-native-async-storage/async-storage';

export default class AsyncStorageService<T> {
  key: string;
  empty: T;

  constructor(key: string, empty: T) {
    this.key = key;
    this.empty = empty;
  }

  async read(): Promise<T | null | Error> {
    return new Promise((resolve, _) => {
      AsyncStorage.getItem(this.key, (error, result) => {
        if (!error) {
          const data = JSON.parse(result || 'null') as T | null;
          return resolve(data);
        }
        return resolve(error);
      });
    });
  }

  async write(data: T): Promise<true | Error> {
    return new Promise((resolve, _) => {
      const sData = JSON.stringify(data);
      AsyncStorage.setItem(this.key, sData, (error) => {
        if (!error) {
          return resolve(true);
        }
        return resolve(error);
      });
    });
  }

  async init(): Promise<T | Error> {
    const result = await this.read();
    if (result === null) {
      const writed = await this.write(this.empty);
      if (writed === true) return this.empty;
      return writed;
    }
    return result;
  }

  async hasSomething(): Promise<string[] | false | Error> {
    return new Promise((resolve, _) => {
      AsyncStorage.getAllKeys((error, result) => {
        if (!!error) resolve(error);
        if (Array.isArray(result) && result.length) resolve(result);
        resolve(false);
      });
    });
  }

  static async clear() {
    AsyncStorage.clear();
  }
}
