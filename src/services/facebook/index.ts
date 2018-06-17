export class Facebook {
  private token: string;
  private version: string;

  constructor(token: string, version: string) {
    this.token = token;
    this.version = version;
  }
}

export default Facebook;
