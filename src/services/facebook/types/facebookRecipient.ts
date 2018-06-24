import {IFacebookRecipient} from '../interfaces';

export class FacebookRecipient implements IFacebookRecipient {
  public readonly id: string;
  public readonly is_thread: boolean;

  constructor(id: string, is_tread: boolean) {
    this.id = id;
    this.is_thread = is_tread;
  }
}

export default FacebookRecipient;
