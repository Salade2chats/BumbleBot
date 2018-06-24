import * as EventEmitter from 'events';
import * as request from 'request-promise';
import {ILogger} from '../logger';
import {FindImageIntent, GreetingIntent} from './intents';
import {IWitContext, IWitEntities, IWitMessageAnswer, IWitMessageQuery} from './interfaces';

export class Wit {
  private readonly emitter: EventEmitter;
  private readonly token: string;
  private readonly version: string;
  private readonly headers: {};
  private readonly api = 'https://api.wit.ai/';
  private readonly logger: ILogger;

  constructor(token: string, version: string, logger?: ILogger) {
    this.token = token;
    this.version = version;
    this.emitter = new EventEmitter();
    this.headers = {
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/vnd.wit.' + this.version + '+json',
      'Content-Type': 'application/json',
    };
    if (logger) {
      this.logger = logger;
    }
  }

  message(text: string, context?: IWitContext, n?: number, verbose?: boolean, sharedData?: any) {
    const path = 'message';
    const qs: IWitMessageQuery = {
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
      .then((json: IWitMessageAnswer) => {
        return this.parseEntities(json.entities);
      })
      .then(intents => {
        for (const intent of intents) {
          this.emitter.emit(intent.constructor.name, intent, sharedData);
        }
        return Promise.resolve(intents);
      });
  }

  on(type, callback) {
    this.emitter.on(type, callback);
  }

  parseEntities(entities: IWitEntities) {
    const intents: Object[] = [];
    if (Object.hasOwnProperty.call(entities, 'intent')) {
      for (let i = 0, n = entities.intent.length; i < n; i++) {
        switch (entities.intent[i].value) {
          case 'find_image':
            intents.push(new FindImageIntent(entities));
            if (this.logger) {
              this.logger.debug('Intent detected', intents[intents.length - 1]);
            }
            break;
          case 'greeting':
            intents.push(new GreetingIntent(entities));
            if (this.logger) {
              this.logger.debug('Intent detected', intents[intents.length - 1]);
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
