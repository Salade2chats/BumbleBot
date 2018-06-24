import * as request from 'request-promise';
import {ILogger} from '../logger';

export class GoogleClient {
  private readonly apiKey: string;
  private readonly customSearchID: string = '000622945010313952938:hl4t8y1jy3o';
  private readonly logger: ILogger;
  private readonly uri: string = 'https://www.googleapis.com/customsearch/v1';

  constructor(apiKey: string, logger?: ILogger) {
    this.apiKey = apiKey;
    if (logger) {
      this.logger = logger;
    }
  }

  findImage(q: string, animated: boolean = false) {
    let qs;
    qs = {
      q: q,
      cx: this.customSearchID,
      searchType: 'image',
      fields: 'items/link',
      key: this.apiKey
    };
    if (animated) {
      qs.hq = 'gif';
    }
    qs.start = Math.floor(Math.random() * (5 - 1)) + 1;

    const query = {
      method: 'GET',
      uri: this.uri,
      qs: qs,
      // headers: this.headers,
      json: true
    };
    return request(query)
      .then(result => {
        const randomResult = result.items[Math.floor(Math.random() * result.items.length)];
        return Promise.resolve(randomResult);
      });
  }
}

export default GoogleClient;
