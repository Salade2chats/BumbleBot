export interface IQuickReplyFormatted {
  content_type: string;
  title?: string;
  payload?: string;
  image_url?: string;
}

export interface IQuickReply extends IQuickReplyFormatted {
  expose(): IQuickReplyFormatted;
}
