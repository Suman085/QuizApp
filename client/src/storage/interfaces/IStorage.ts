export interface IStorage<DataType, Options = null> {
    getItem(key: string): DataType | null;
    setItem(key: string, value: DataType, options?: Options): void;
    removeItem(key: string): void;
    clear(): void;
  }
  