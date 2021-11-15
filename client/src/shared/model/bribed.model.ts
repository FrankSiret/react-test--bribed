export interface ISolutionBribed {
  tooChaotic?: boolean,
  bribed?: number,
  details?: {
    queue?: number[],
    indexA?: number,
    indexB?: number,
  }[]
};

export interface IBribed {
  _id?: string;
  queue?: number[];
  solution?: ISolutionBribed;
}

export const defaultValue: Readonly<IBribed> = {};
