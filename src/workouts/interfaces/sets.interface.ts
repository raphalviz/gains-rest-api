import { StraightSet } from './straight-set.interface';

export enum SetType {
  Straight,
  Drop,
  Super,
}

export interface Sets {
  setType: SetType;
  list: Array<StraightSet>;
}
