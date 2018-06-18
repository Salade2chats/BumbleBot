export interface IEntities {
  [key: string]: IEntity[];
}

export interface IEntity {
  suggested?: boolean;
  confidence: number;
  value: string;
  type?: string;
}
