export interface IDependencyInjector {
  register(name: string, instance: object): void;
  share(name: string, value: any): void;
  get(name: string): object|any|null;
}

export default IDependencyInjector;
