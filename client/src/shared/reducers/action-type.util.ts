import { AxiosPromise } from 'axios';

/**
 * Appends REQUEST async action type
 */

export const REQUEST = (actionType: string) => `${actionType}_PENDING`;

/**
 * Appends SUCCESS async action type
 */

export const SUCCESS = (actionType: string) => `${actionType}_FULFILLED`;

/**
 * Appends FAILURE async action type
 */

export const FAILURE = (actionType: string) => `${actionType}_REJECTED`;

export interface IPayload<T> {
    type: string;
    payload: AxiosPromise<T>;
    meta?: any;
}
export declare type IPayloadResult<T> = ((dispatch: any, getState?: any) => IPayload<T> | Promise<IPayload<T>>);
export declare type ICrudGetAction<T> = (id: string) => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudGetAllAction<T> = () => IPayload<T> | ((dispatch: any) => IPayload<T>);
export declare type ICrudPutAction<T, R> = (id: string, data?: T) => IPayload<R> | IPayloadResult<R>;
export declare type ICrudPostAction<T, R> = (data?: T) => IPayload<R> | IPayloadResult<R>;
export declare type ICrudDeleteAction<T> = (id?: string) => IPayload<T> | IPayloadResult<T>;