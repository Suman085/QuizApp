import { IStorage } from "./interfaces/IStorage";

abstract class Storage<DataType> {
  private readonly storage: IStorage<DataType>;

  public constructor(storage: IStorage<DataType>) {
    this.storage = storage;
  }

  getItem = (key: string): DataType | null => {
    return this.storage.getItem(key);
  };

  setItem = (key: string, value: DataType): void => {
    return this.storage.setItem(key, value);
  };

  removeItem = (key: string): void => {
    return this.storage.removeItem(key);
  };

  clear = (): void => {
    return this.storage.clear();
  };
}

export default Storage;
