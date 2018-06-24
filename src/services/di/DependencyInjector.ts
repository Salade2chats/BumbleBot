import {IDependencyInjector, IDependencyInjectorServices, IDependencyInjectorShares} from './interfaces';

export class DependencyInjector implements IDependencyInjector {
  private static _instance: DependencyInjector = new DependencyInjector();

  private services: IDependencyInjectorServices = {};

  private shares: IDependencyInjectorShares = {};

  constructor() {
    if (DependencyInjector._instance) {
      throw new Error('Error: Instantiation failed: Use DependencyInjector.getInstance() instead of new.');
    }
    DependencyInjector._instance = this;
  }

  public static getInstance(): DependencyInjector {
    return DependencyInjector._instance;
  }

  public register(name: string, instance: object): void {
    this.shield(name);
    this.services[name] = instance;
  }

  public share(name: string, value: any): void {
    this.shield(name);
    this.shares[name] = value;
  }

  public get(name: string): object|any|null {
    if (Object.hasOwnProperty.call(this.services, name)) {
      return this.services[name];
    }
    return null;
  }

  private shield(name: string): void {
    if (Object.hasOwnProperty.call(this.shares, name)) {
      throw new Error('Name "' + name + '" already registered as share');
    }
    if (Object.hasOwnProperty.call(this.services, name)) {
      throw new Error('Name "' + name + '" already registered as service');
    }
  }
}

export default DependencyInjector;
