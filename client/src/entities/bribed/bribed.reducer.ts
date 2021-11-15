/* eslint-disable no-console */
import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE, ICrudGetAllAction, ICrudGetAction, ICrudPostAction, ICrudPutAction, ICrudDeleteAction } from '../../shared/reducers/action-type.util';

import { EntityState } from '../../shared/reducers/reducer.utils';
import { IBribed, defaultValue } from '../../shared/model/bribed.model';

export const ACTION_TYPES = {
  FETCH_BRIBED_LIST: 'bribed/fetch_entity_list',
  FETCH_BRIBED: 'bribed/fetch_entity',
  CREATE_BRIBED: 'bribed/create_entity',
  UPDATE_BRIBED: 'bribed/update_entity',
  DELETE_BRIBED: 'bribed/delete_entity',
  RESET: 'bribed/reset',
};

const initialState: EntityState<IBribed> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type TDataType = {
  _id?: string;
  queue: number[];
}

export type IResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}

export type BribedState = Readonly<typeof initialState>;

const apiUrl = 'v1/bribed';

// Actions

export const getEntities: ICrudGetAllAction<IResponse<IBribed[]>> = () => ({
  type: ACTION_TYPES.FETCH_BRIBED_LIST,
  payload: axios.get<IResponse<IBribed[]>>(apiUrl)
});

export const getEntity: ICrudGetAction<IResponse<IBribed>> = (id: string) => ({
  type: ACTION_TYPES.FETCH_BRIBED,
  payload: axios.get<IResponse<IBribed>>(`${apiUrl}/${id}`)
});

export const createEntity: ICrudPostAction<TDataType, IResponse<IBribed>> = (data) => ({
  type: ACTION_TYPES.CREATE_BRIBED,
  payload: axios.post<IResponse<IBribed>>(apiUrl, data)
});

export const updateEntity: ICrudPutAction<TDataType, IResponse<IBribed>> = (id, data) => ({
  type: ACTION_TYPES.CREATE_BRIBED,
  payload: axios.put<IResponse<IBribed>>(`${apiUrl}/${id}`, data)
});

export const deleteEntity = (id: string) => ({
  type: ACTION_TYPES.DELETE_BRIBED,
  payload: axios.delete<IResponse<IBribed>>(`${apiUrl}/${id}`)
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});

// Reducer

export default (state: BribedState = initialState, action: any): BribedState => {
  console.log('action', action.type)
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BRIBED_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BRIBED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BRIBED):
    case REQUEST(ACTION_TYPES.UPDATE_BRIBED):
    case REQUEST(ACTION_TYPES.DELETE_BRIBED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BRIBED_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BRIBED):
    case FAILURE(ACTION_TYPES.CREATE_BRIBED):
    case FAILURE(ACTION_TYPES.UPDATE_BRIBED):
    case FAILURE(ACTION_TYPES.DELETE_BRIBED):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload.message,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BRIBED_LIST): {
      console.log(action.payload)
      console.log(action.payload.data)
      console.log(action.payload.data.data)
      const entities: IBribed[] = action.payload.data.data ?? [];
      return {
        ...state,
        loading: false,
        entities,
        totalItems: entities.length,
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_BRIBED):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BRIBED):
    case SUCCESS(ACTION_TYPES.UPDATE_BRIBED):
    case SUCCESS(ACTION_TYPES.DELETE_BRIBED):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}