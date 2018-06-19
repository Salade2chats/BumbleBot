import {IAttachment} from './attachment';
import {IQuickReplies} from './quickReplies';
import {IQuickReply} from './quickReply';

export interface IMessage {
  text?: string;
  attachment?: IAttachment;
  quick_replies?: IQuickReply[];
  metadata?: string;
}

export class Message implements IMessage {
  public readonly text: string;
  public readonly attachment: IAttachment;
  public readonly quick_replies: IQuickReply[];
  public readonly metadata: string;

  constructor(text?: string, attachment?: IAttachment, quick_replies?: IQuickReplies, metadata?: string) {
    this.text = text;
    this.attachment = attachment;
    this.quick_replies = quick_replies.expose();
    this.metadata = metadata;
    if (!this.text && !this.attachment && !this.quick_replies) {
      throw Error('Message: at least a text, an attachment or a quick_reply is required.');
    }
  }

  expose(): IMessage {
    const message: IMessage = {
      text: this.text
    };
    if (this.attachment) {
      message.attachment = this.attachment.expose();
    }
    if (this.quick_replies) {
      message.quick_replies = this.quick_replies;
    }
    if (this.metadata) {
      message.metadata = this.metadata;
    }
    return message;
  }
}

export default Message;
