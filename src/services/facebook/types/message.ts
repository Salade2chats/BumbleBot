import {IAttachment, IMessage, IMessageFormatted, IQuickReplies} from '../interfaces';

export class Message implements IMessage {
  public readonly text: string;
  public readonly attachment: IAttachment;
  public readonly quick_replies: IQuickReplies;
  public readonly metadata: string;

  constructor(text?: string, attachment?: IAttachment, quick_replies?: IQuickReplies, metadata?: string) {
    this.text = text;
    this.attachment = attachment;
    this.quick_replies = quick_replies;
    this.metadata = metadata;
    if (!this.text && !this.attachment && !this.quick_replies) {
      throw Error('Message: at least a text, an attachment or a quick_reply is required.');
    }
  }

  expose(): IMessageFormatted {
    const message: IMessageFormatted = {
      text: this.text
    };
    if (this.attachment) {
      message.attachment = this.attachment.expose();
    }
    if (this.quick_replies) {
      message.quick_replies = this.quick_replies.expose();
    }
    if (this.metadata) {
      message.metadata = this.metadata;
    }
    return message;
  }
}

export default Message;
