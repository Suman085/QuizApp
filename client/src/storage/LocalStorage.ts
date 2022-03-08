import { IStorage } from "./interfaces/IStorage";

class LocalStorage<DataType> implements IStorage<DataType> {
  getItem(key: string): DataType {
    return JSON.parse(window.localStorage.getItem(key) || "{}");
  }

  setItem(key: string, value: DataType): void {
    return window.localStorage.setItem(key, JSON.stringify(value || {}));
  }
  removeItem(key: string): void {
    return window.localStorage.removeItem(key);
  }
  clear(): void {
    return window.localStorage.clear();
  }
}

export default LocalStorage;
