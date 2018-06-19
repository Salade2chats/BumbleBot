export interface IAttachment {
  type: string;
  payload: any;
  expose(): IAttachment;
}
