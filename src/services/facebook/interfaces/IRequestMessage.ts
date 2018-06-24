import {IFacebookRecipient} from "./index";

export interface IReceivedMessage {
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

export interface IRequestMessage {
  forMe(): boolean;
  fromThread(): string|false;
  aboutMe(): boolean;
  senderId(): string;
  answerRecipient(): IFacebookRecipient;
  messageText(): string;
}
