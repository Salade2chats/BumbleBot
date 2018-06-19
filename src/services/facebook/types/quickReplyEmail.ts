import {IQuickReply, IQuickReplyFormatted} from '../interfaces';

export class QuickReplyEmail implements IQuickReply {
  public readonly content_type = 'user_email';

  expose(): IQuickReplyFormatted {
    return {
      content_type: this.content_type
    };
  }
}

export default QuickReplyEmail;
