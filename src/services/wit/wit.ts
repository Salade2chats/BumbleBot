import * as request from 'request-promise';
import {Logger} from '../utils';
import {FindImageIntent} from './intents';
import {IEntities} from './entity';

export interface IContext {
  reference_time?: string;
  timezone: string;
  locale: string;
  coordinates: IContextCoordinates;
}

export interface IContextCoordinates {
  lat: number;
  long: number;
}

interface IMessageQuery {
  q: string;
  context?: IContext;
  n?: number;
  verbose?: boolean;
}

interface IMessageAnswer {
  _text: string;
  entities: IEntities;
  msg_id: string;
}

export class Wit {
  private readonly token: string;
  private readonly version: string;
  private readonly headers: {};
  private readonly api = 'https://api.wit.ai/';
  private readonly logger: Logger;

  constructor(token: string, version: string, logger?: Logger) {
    this.token = token;
    this.version = version;
    this.headers = {
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/vnd.wit.' + this.version + '+json',
      'Content-Type': 'application/json',
    };
    this.logger = logger;
  }

  message(text: string, context?: IContext, n?: number, verbose?: boolean) {
    const path = 'message';
    const qs: IMessageQuery = {
      q: text
    };
    if (context) {
      qs.context = context;
    }
    if (n) {
      qs.n = n;
    }
    if (verbose) {
      qs.verbose = verbose;
    }
    const query = {
      method: 'GET',
      uri: this.api + path,
      qs: qs,
      headers: this.headers,
      json: true
    };
    return request(query)
      .then((json: IMessageAnswer) => {
        return this.parseEntities(json.entities);
      });
  }

  parseEntities(entities: IEntities) {
    const intents: Object[] = [];
    if (Object.hasOwnProperty.call(entities, 'intent')) {
      for (let i = 0, n = entities.intent.length; i < n; i++) {
        switch (entities.intent[i].value) {
          case 'find_image':
            const intent = new FindImageIntent(entities);
            intents.push(intent);
            if (this.logger) {
              this.logger.debug('Intent detected', intent);
            }
            break;
          default:
            if (this.logger) {
              this.logger.warning('Unknown Intent "' + entities.intent + '"');
            }
        }
      }
    }
    return Promise.resolve(intents);
  }
}

export default Wit;
