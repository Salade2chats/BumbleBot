import {IQuickReply} from './quickReply';

export class QuickReplyLocation implements IQuickReply {
  public readonly content_type = 'location';

  expose(): IQuickReply {
    return {
      content_type: this.content_type
    };
  }
}

export default QuickReplyLocation;
