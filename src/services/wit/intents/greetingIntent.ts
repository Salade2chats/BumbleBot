import {IEntities} from '../entity';

export class GreetingIntent {
  public name?: string;

  constructor(entities: IEntities) {
    if (Object.hasOwnProperty.call(entities, 'name')) {
      const names = [];
      for (let i = 0, n = entities['name'].length; i < n; i++) {
        names.push(entities['name'][i].value);
      }
      this.name = names.join(' ');
    }
  }

  missingFields(): string[] {
    return [];
  }
}

export default GreetingIntent;
