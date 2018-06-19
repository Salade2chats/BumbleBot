import {IAttachment, IAttachmentFormatted} from '../interfaces';

export class AttachmentImage implements IAttachment {
  public readonly type = 'image';
  public payload: any;

  constructor(url: string, is_reusable: boolean = true) {
    this.payload = {
      url: url,
      is_reusable: is_reusable
    };
  }

  expose(): IAttachmentFormatted {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export default AttachmentImage;
