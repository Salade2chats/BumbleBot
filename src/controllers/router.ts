import {Logger} from '../services/utils';
import {IEntry, IRequestData, Request} from '../services/facebook/request';



class Router {
  private logger?: Logger;

  constructor(logger?: Logger) {
    if (logger) {
      this.logger = logger;
    }
  }

  analyse(facebookData: IRequestData) {
    // todo: check if that's facebook data
    const request = new Request(facebookData);
    if (!request.controller) {
      return;
    }
    const entries = request.getEntries();
    let entry: IEntry = null;
    let action: string = null;
    for (let i = 0, n = entries.length; i < n; i++) {
      entry = entries[i];
      action = Request.getAction(entry);
    }
  }
}
