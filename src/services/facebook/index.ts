import * as EventEmitter from 'events';
import * as request from 'request-promise';
import RequestMessage from './types/requestMessage';
import Message from './types/message';

export class Facebook {
  private token: string;
  private version: string;
  private readonly emitter: EventEmitter;

  constructor(token: string, version: string) {
    this.token = token;
    this.version = version;
    this.emitter = new EventEmitter();
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
            this.emitter.emit('message', new RequestMessage(entry.messaging[y]));
          }
        }
      }
    }
  }

  // @TODO: update return type
  me(): Promise<any> {
    return this.get('me');
  }

  write(recipient: string, message?: Message, action?: string, is_thread?: boolean): Promise<any> {
    if (!message && !action) {
      throw Error('Facebook: message or action is required to write.');
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
    if (is_thread) {
      query.recipient.thread_key = recipient;
    } else {
      query.recipient.id = recipient;
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

export default Facebook;
