import {IQuickReply, IQuickReplyFormatted} from '../interfaces';

export class QuickReplyLocation implements IQuickReply {
  public readonly content_type = 'location';

  expose(): IQuickReplyFormatted {
    return {
      content_type: this.content_type
    };
  }
}

export default QuickReplyLocation;
