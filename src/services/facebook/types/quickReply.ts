export interface IQuickReply {
  content_type: string;
  title?: string;
  payload?: string;
  image_url?: string;
  expose(): IQuickReply;
}
