export interface IMessage {
  sender: {
    id: string,
    community: {
      id: string
    }
  };
  recipient: {
    id: string
  };
  timestamp: number;
  message: {
    mid: string;
    seq: number;
    text: string;
  };
}

export class Message {
  private readonly message: IMessage;

  constructor(message: IMessage) {
    this.message = message;
  }

  forMe(): boolean {
    return this.message.recipient.id === process.env.BOT_ID;
  }
}

export default Message;
