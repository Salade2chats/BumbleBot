import {IWitEntities} from './IWitEntities';

export interface IWitMessageAnswer {
  _text: string;
  entities: IWitEntities;
  msg_id: string;
}

export default IWitMessageAnswer;
