import * as request from 'request-promise';

export class CustomSearch {
  private readonly uri: string = 'https://www.googleapis.com/customsearch/v1';
  private readonly customSearchID: string = '000622945010313952938:hl4t8y1jy3o';
  private readonly apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  search (q: string, animated: boolean = false) {
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

    const query = {
      method: 'GET',
      uri: this.uri,
      qs: qs,
      // headers: this.headers,
      json: true
    };
    return request(query);
  }
}
// https://www.googleapis.com/customsearch/v1?q=raphael&cx=000622945010313952938%3Ahl4t8y1jy3o&hq=gif&searchType=image&
// fields=items%2Flink&key=AIzaSyD8VHx3jAUVu1TSYlZmxB7C4OfeSliBwcI
/*
cx 000622945010313952938:hl4t8y1jy3o
hq gif
q STRING
fields items/link
key APIKEY
AIzaSyD8VHx3jAUVu1TSYlZmxB7C4OfeSliBwcI
*/
export default CustomSearch;
