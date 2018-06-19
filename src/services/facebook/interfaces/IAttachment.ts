export interface IAttachmentFormatted {
  type: string;
  payload: any;
}

export interface IAttachment extends IAttachmentFormatted {
  expose(): IAttachmentFormatted;
}
