import {IQuickReply, IQuickReplyFormatted} from '../interfaces';

export class QuickReplyPhoneNumber implements IQuickReply {
  public readonly content_type = 'user_phone_number';

  expose(): IQuickReplyFormatted {
    return {
      content_type: this.content_type
    };
  }
}

export default QuickReplyPhoneNumber;
