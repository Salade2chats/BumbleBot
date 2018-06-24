import {IWitContextCoordinates} from './IWitContextCoordinates';

export interface IWitContext {
  reference_time?: string;
  timezone: string;
  locale: string;
  coordinates: IWitContextCoordinates;
}

export default IWitContext;
