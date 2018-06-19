import {IQuickReply} from './quickReply';

export interface IQuickReplies {
  quick_replies: IQuickReply[];
  expose(): IQuickReply[];
}

export class QuickReplies {
  public quick_replies;

  constructor(quick_replies: IQuickReply[]) {
    this.quick_replies = quick_replies;
  }

  public expose() {
    const quick_replies = [];
    for (const quick_reply of this.quick_replies) {
      quick_replies.push(quick_reply.expose());
    }
    return quick_replies;
  }
}
