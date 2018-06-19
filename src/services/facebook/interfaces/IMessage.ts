import {IAttachment, IAttachmentFormatted, IQuickReplies, IQuickReplyFormatted} from './index';

export interface IMessageFormatted {
  text?: string;
  attachment?: IAttachmentFormatted;
  quick_replies?: IQuickReplyFormatted[];
  metadata?: string;
}

export interface IMessage {
  text?: string;
  attachment?: IAttachment;
  quick_replies?: IQuickReplies;
  metadata?: string;
  expose(): IMessageFormatted;
}
