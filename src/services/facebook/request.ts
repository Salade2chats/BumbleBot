import {Logger} from '../utils';
import * as util from 'util';

const inspect = util.inspect;

export interface IRequestData {
  object: string;
  entry: IEntry[];
}

export interface IEntry {
  id: string;
  time: number;
  messaging?: IMessaging[];
}

export interface IMessaging {
  sender: ISender;
  recipient: IRecipient;
  thread: IThread;
  timestamp: number;
  message: IMessage;
}

export interface ISender {
  id: string;
  community: ICommunity;
}

export interface ICommunity {
  id: string;
}

export interface IRecipient {
  id: string;
}

export interface IThread {
  id: string;
}

export interface IMessage {
  mid: string;
  seq: number;
  text: string;
}

export class Request {
  public controller: string;
  public action: string;
  private request: IRequestData;
  private logger?: Logger;

  constructor(request: IRequestData, logger?: Logger) {
    this.request = request;
    if (logger) {
      this.logger = logger;
    }
    this.controller = this.getController();

  }

  public static getAction(entry: IEntry) {
    if (Object.hasOwnProperty.call(entry, 'messaging')) {
      return 'messaging';
    }
    return null;
  }

  public getEntries(): IEntry[] {
    return this.request.entry;
  }

  private getController(): string|null {
    switch (this.request.object) {
      case 'page':
        if (this.logger) {
          this.logger.debug('Request object type "page"', inspect(this.request, {depth: 50}));
        }
        return 'page';
      case 'group':
        if (this.logger) {
          this.logger.debug('Request object type "group"', inspect(this.request, {depth: 50}));
        }
        return null;
      case 'user':
        if (this.logger) {
          this.logger.debug('Request object type "user"', inspect(this.request, {depth: 50}));
        }
        return null;
      default:
        if (this.logger) {
          this.logger.warning('Unknown request object', this.request.object);
        }
        return null;
    }
  }
}

export default Request;
