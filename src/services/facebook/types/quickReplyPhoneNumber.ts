import {IQuickReply} from './quickReply';

export class QuickReplyPhoneNumber implements IQuickReply {
  public readonly content_type = 'user_phone_number';

  expose(): IQuickReply {
    return {
      content_type: this.content_type
    };
  }
}

export default QuickReplyPhoneNumber;
