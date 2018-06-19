import {IAttachment} from './attachment';

export class AttachmentImage implements IAttachment {
  public readonly type = 'image';
  public payload: any;

  constructor(url: string, is_reusable: boolean = true) {
    this.payload = {
      url: url,
      is_reusable: is_reusable
    };
  }

  expose(): IAttachment {
    return {
      type: this.type,
      payload: this.payload
    };
  }
}

export default AttachmentImage;
