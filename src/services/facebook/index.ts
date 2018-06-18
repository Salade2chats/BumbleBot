import * as EventEmitter from 'events';

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

  analyseRequest(request) {
    let entry;
    if (request.object === 'page') {
      for (let i = 0, n = request.entry.length; i < n; i++) {
        entry = request.entry[i];
        if (Object.hasOwnProperty.call(entry, 'messaging')) {
          for (let y = 0, m = entry.messaging.length; y < m; y++) {
            this.emitter.emit('message', entry[y]);
          }
        }
      }
    }
  }

}

export default Facebook;
