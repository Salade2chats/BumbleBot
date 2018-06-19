import {IQuickReply, IQuickReplyFormatted} from '../interfaces';

export class QuickReplyText implements IQuickReply {
  public readonly content_type = 'text';
  public title;
  public payload;
  public image_url;

  constructor(title?: string, image_url?: string, payload?: string) {
    this.title = title;
    this.payload = payload;
    this.image_url = image_url;
    if (!this.image_url && !this.title) {
      throw Error('QuickReplyText: At least a title or an image_url is required.');
    }
  }

  expose(): IQuickReplyFormatted {
    return {
      content_type: this.content_type,
      title: this.title,
      payload: this.payload,
      image_url: this.image_url
    };
  }
}

export default QuickReplyText;
