export interface IRequestMessage {
  sender: {
    id: string,
    community: {
      id: string
    }
  };
  recipient: {
    id: string
  };
  thread?: {
    id: string;
  };
  timestamp: number;
  message: {
    mid: string;
    seq: number;
    text: string;
  };
  mentions?: {
    offset: number;
    length: number;
    id: string;
  }[];
}

export class RequestMessage {
  private readonly message: IRequestMessage;

  constructor(message: IRequestMessage) {
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
    return false;
  }

  fromThread(): string|null {
    if (Object.hasOwnProperty.call(this.message, 'thread')) {
      return this.message.thread.id;
    }
    return null;
  }
}

export default RequestMessage;
