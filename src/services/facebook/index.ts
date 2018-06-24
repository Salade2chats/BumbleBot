import * as EventEmitter from 'events';
import * as request from 'request-promise';
import RequestMessage from './types/requestMessage';
import Message from './types/message';
import {ILogger} from '../logger';
import {IFacebookRecipient} from '../index';

export class Facebook {
  private readonly emitter: EventEmitter;
  private readonly logger: ILogger;
  private readonly token: string;
  private readonly version: string;

  constructor(token: string, version: string, logger?: ILogger) {
    this.token = token;
    this.version = version;
    this.emitter = new EventEmitter();
    if (logger) {
      this.logger = logger;
    }
  }

  on(type, callback) {
    this.emitter.on(type, callback);
  }

  analyseRequest(req) {
    let entry;
    if (req.object === 'page') {
      for (let i = 0, n = req.entry.length; i < n; i++) {
        entry = req.entry[i];
        if (Object.hasOwnProperty.call(entry, 'messaging')) {
          for (let y = 0, m = entry.messaging.length; y < m; y++) {
            const message = new RequestMessage(entry.messaging[y]);
            if (message.messageText()) {
              this.emitter.emit('message', message);
            }
          }
        }
      }
    }
  }

  // @TODO: update return type
  me(): Promise<any> {
    return this.get('me');
  }

  write(recipient: IFacebookRecipient, message?: Message, action?: string): Promise<any> {
    if (!message && !action) {
      throw Error('Facebook: message or action is required to write.');
    }
    if (!message && !action) {
      throw Error('Facebook: message or action is required to write, not both.');
    }
    let query;
    query = {
      recipient: {},
    };
    if (message) {
      query.messaging_type = 'RESPONSE';
      query.message = message.expose();
    }
    if (action) {
      query.sender_action = action;
    }
    if (recipient.is_thread) {
      query.recipient.thread_key = recipient.id;
    } else {
      query.recipient.id = recipient.id;
    }
    return this.post('me/messages', query);
  }

  private post(path, data): Promise<any> {
    const uri = 'https://graph.facebook.com/' + this.version;
    const qs = {
      access_token: this.token
    };
    const query = {
      method: 'POST',
      uri: uri + '/' + path,
      qs: qs,
      // headers: this.headers,
      body: data,
      json: true
    };
    return request(query);
  }

  private get(path, fields?: {}): Promise<any> {
    const uri = 'https://graph.facebook.com/' + this.version;
    let qs;
    if (fields) {
      qs = fields;
    }
    if (!qs) {
      qs = {};
    }
    qs.access_token = this.token;
    const query = {
      method: 'GET',
      uri: uri + '/' + path,
      qs: qs,
      // headers: this.headers,
      json: true
    };
    return request(query);
  }
}

export * from './interfaces';
export * from './types';

export default Facebook;
