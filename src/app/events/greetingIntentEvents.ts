import * as util from 'util';
import {DependencyInjector, Facebook, GreetingIntent, IDependencyInjector, Message} from '../../services';
import {IGreetingIntentEventData} from './interfaces';

export class GreetingIntentEvents {
  private readonly intent;
  private readonly data;
  private readonly facebook: Facebook;

  constructor(intent: GreetingIntent, data: IGreetingIntentEventData) {
    this.intent = intent;
    this.data = data;
    const DI: IDependencyInjector = DependencyInjector.getInstance();
    this.facebook = DI.get('facebook');
  }

  trigger(): void {
    this.facebook.write(
      (this.data.requestMessage).answerRecipient(),
      new Message('Bonjour !')
    ).then(data => {
      console.log('MESSAGE SUBMITTED', util.inspect(data, {depth: 5}));
    }).catch(error => {
      console.log('MESSAGE ERROR', util.inspect(error, {depth: 5}));
    });
  }
}

export default GreetingIntentEvents;
