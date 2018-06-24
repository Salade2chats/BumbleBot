import {IWitContext} from './IWitContext';

export interface IWitMessageQuery {
  q: string;
  context?: IWitContext;
  n?: number;
  verbose?: boolean;
}

export default IWitMessageQuery;
