import {IFacebookRecipient, IReceivedMessage, IRequestMessage} from '../interfaces';
import {FacebookRecipient} from './facebookRecipient';

export class RequestMessage implements IRequestMessage {
  private readonly message: IReceivedMessage;

  constructor(message: IReceivedMessage) {
    this.message = message;
  }

  forMe(): boolean {
    if (!this.fromThread() && this.message.recipient.id === process.env.BOT_ID) {
      return true;
    }
    if (this.fromThread() && Object.hasOwnProperty.call(this.message, 'mentions')) {
      for (const mention of this.message.mentions) {
        if (mention.offset === 0 && mention.id === process.env.BOT_ID) {
          return true;
        }
      }
    }
    const botRegExp = new RegExp('^@?' + process.env.BOT_NAME + '[\\s,]{1}', 'gi');
    return (this.fromThread() && botRegExp.test(this.message.message.text));
  }

  aboutMe(): boolean {
    const botRegExp = new RegExp(process.env.BOT_NAME, 'gi');
    return (this.fromThread() && botRegExp.test(this.message.message.text));
  }

  fromThread(): string | false {
    if (Object.hasOwnProperty.call(this.message, 'thread')) {
      return this.message.thread.id;
    }
    return false;
  }

  senderId(): string {
    return this.message.sender.id;
  }

  answerRecipient(): IFacebookRecipient {
    const thread = this.fromThread();
    if (thread) {
      return new FacebookRecipient(thread, true);
    } else {
      return new FacebookRecipient(this.senderId(), false);
    }
  }

  messageText(): string {
    if (this.message.message) {
      return this.message.message.text;
    }
    return null;
  }
}

export default RequestMessage;
