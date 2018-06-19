import {IQuickReply, IQuickReplyFormatted} from './index';

export interface IQuickReplies {
  quick_replies: IQuickReply[];
  expose(): IQuickReplyFormatted[];
}
