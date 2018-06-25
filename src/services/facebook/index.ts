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
      for (let i = 0, n = request.entries.length; i < n; i++) {
        entry = request.entries[i];
        if (Object.hasOwnProperty.call(entry, 'messaging')) {
          this.emitter.emit('messaging', entry);
        }
      }
    }
  }

}

export default Facebook;
