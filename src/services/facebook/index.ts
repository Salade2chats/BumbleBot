import * as EventEmitter from 'events';
import * as request from 'request-promise';
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
            this.emitter.emit('message', new Message(entry.messaging[y]));
          }
        }
      }
    }
  }

  me() {
    return this.get('me');
  }

  private get(path, fields?: {}) {
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
