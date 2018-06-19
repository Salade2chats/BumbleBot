import {IQuickReply} from './quickReply';

export class QuickReplyEmail implements IQuickReply {
  public readonly content_type = 'user_email';

  expose(): IQuickReply {
    return {
      content_type: this.content_type
    };
  }
}

export default QuickReplyEmail;
