import {IQuickReply, IQuickReplies, IQuickReplyFormatted} from '../interfaces';

export class QuickReplies implements IQuickReplies {
  public quick_replies: IQuickReply[];

  constructor(quick_replies: IQuickReply[]) {
    this.quick_replies = quick_replies;
  }

  public expose(): IQuickReplyFormatted[] {
    const quick_replies: IQuickReplyFormatted[] = [];
    for (const quick_reply of this.quick_replies) {
      quick_replies.push(quick_reply.expose());
    }
    return quick_replies;
  }
}

export default QuickReplies;
