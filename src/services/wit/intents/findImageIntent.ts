import {IWitEntities} from '../interfaces';

export class FindImageIntent {
  public subject: string;
  public isAnimated?: boolean;

  constructor(entities: IWitEntities) {
    if (Object.hasOwnProperty.call(entities, 'subject')) {
      const subjects = [];
      for (let i = 0, n = entities['subject'].length; i < n; i++) {
        subjects.push(entities['subject'][i].value);
      }
      this.subject = subjects.join(' ');
    }

    if (Object.hasOwnProperty.call(entities, 'animated')) {
      for (let i = 0, n = entities['animated'].length; i < n; i++) {
        this.isAnimated = true;
      }
    }
  }

  missingFields(): string[] {
    const fields: string[] = [];
    if (!this.subject) {
      fields.push('subject');
    }
    return fields;
  }
}

export default FindImageIntent;
