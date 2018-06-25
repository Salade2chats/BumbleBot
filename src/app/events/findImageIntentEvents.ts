import * as util from 'util';
import {
  AttachmentImage,
  DependencyInjector,
  Facebook,
  FindImageIntent,
  GoogleClient,
  IDependencyInjector,
  Message
} from '../../services';
import {IFindImageIntentEventData} from './interfaces';

export class FindImageIntentEvents {
  private readonly intent: FindImageIntent;
  private readonly data;
  private readonly facebook: Facebook;
  private readonly google: GoogleClient;

  constructor(intent: FindImageIntent, data: IFindImageIntentEventData) {
    this.intent = intent;
    this.data = data;
    const DI: IDependencyInjector = DependencyInjector.getInstance();
    this.facebook = DI.get('facebook');
    this.google = DI.get('google');
  }

  trigger(): void {
    if (this.intent.missingFields().length > 0) {
      this.facebook.write(
        this.data.requestMessage.answerRecipient(),
        new Message('Je dois chercher quelle image ?')
      );
    } else {
      this.facebook.write(
        this.data.requestMessage.answerRecipient(),
        new Message('Compris !')
      ).then(data => {
        return this.google.findImage(this.intent.subject, this.intent.isAnimated);
      }).then(data => {
        // @TODO: treat THEN
        const image = new AttachmentImage(data.link);
        this.facebook.write(
          this.data.requestMessage.answerRecipient(),
          new Message(undefined, image)
        );
      }).catch(error => {
        console.log('MESSAGE ERROR', util.inspect(error, {depth: 5}));
      });
    }
  }
}

export default FindImageIntentEvents;
