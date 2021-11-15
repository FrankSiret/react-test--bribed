/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from 'axios';

import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import reducer, {
  ACTION_TYPES,
  createEntity,
  deleteEntity,
  getEntities,
  getEntity,
  updateEntity,
  reset,
} from './bribed.reducer';
import { REQUEST, SUCCESS, FAILURE } from '../../shared/reducers/action-type.util';
import { IBribed, defaultValue } from '../../shared/model/bribed.model';

describe('Entities reducer tests', () => {
  function isEmpty(element: { [key: string]: any }): boolean {
    if (element instanceof Array) {
      return element.length === 0;
    } else {
      return Object.keys(element).length === 0;
    }
  }

  const initialState = {
    loading: false,
    errorMessage: null,
    entities: [] as ReadonlyArray<IBribed>,
    entity: defaultValue,
    totalItems: 0,
    updating: false,
    updateSuccess: false,
  };

  function testInitialState(state: any) {
    expect(state).toMatchObject({
      loading: false,
      errorMessage: null,
      updating: false,
      updateSuccess: false,
    });
    expect(isEmpty(state.entities));
    expect(isEmpty(state.entity));
  }

  function testMultipleTypes(types: any[], payload: any, testFunction: any) {
    types.forEach(e => {
      testFunction(reducer(undefined, { type: e, payload }));
    });
  }

  describe('Common', () => {
    it('should return the initial state', () => {
      testInitialState(reducer(undefined, {}));
    });
  });

  describe('Requests', () => {
    it('should set state to loading', () => {
      testMultipleTypes([REQUEST(ACTION_TYPES.FETCH_BRIBED_LIST), REQUEST(ACTION_TYPES.FETCH_BRIBED)], {}, (state: any) => {
        expect(state).toMatchObject({
          errorMessage: null,
          updateSuccess: false,
          loading: true,
        });
      });
    });

    it('should set state to updating', () => {
      testMultipleTypes(
        [
          REQUEST(ACTION_TYPES.CREATE_BRIBED),
          REQUEST(ACTION_TYPES.UPDATE_BRIBED),
          REQUEST(ACTION_TYPES.DELETE_BRIBED),
        ],
        {},
        (state: any) => {
          expect(state).toMatchObject({
            errorMessage: null,
            updateSuccess: false,
            updating: true,
          });
        }
      );
    });

    it('should reset the state', () => {
      expect(
        reducer(
          { ...initialState, loading: true },
          {
            type: ACTION_TYPES.RESET,
          }
        )
      ).toEqual({
        ...initialState,
      });
    });
  });

  describe('Failures', () => {
    it('should set a message in errorMessage', () => {
      testMultipleTypes(
        [
          FAILURE(ACTION_TYPES.FETCH_BRIBED_LIST),
          FAILURE(ACTION_TYPES.FETCH_BRIBED),
          FAILURE(ACTION_TYPES.CREATE_BRIBED),
          FAILURE(ACTION_TYPES.UPDATE_BRIBED),
          FAILURE(ACTION_TYPES.DELETE_BRIBED),
        ],
        { message: 'error message' },
        (state: any) => {
          expect(state).toMatchObject({
            errorMessage: 'error message',
            updateSuccess: false,
            updating: false,
          });
        }
      );
    });
  });

  describe('Successes', () => {
    it('should fetch all entities', () => {
      const payload = { data: { success: true, data: [{ 1: 'fake1' }, { 2: 'fake2' }] } };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.FETCH_BRIBED_LIST),
          payload,
        })
      ).toEqual({
        ...initialState,
        loading: false,
        totalItems: payload.data.data.length,
        entities: payload.data.data,
      });
    });

    it('should fetch a single entity', () => {
      const payload = { data: { success: true, data: { 1: 'fake1' } } };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.FETCH_BRIBED),
          payload,
        })
      ).toEqual({
        ...initialState,
        loading: false,
        entity: payload.data.data,
      });
    });

    it('should create/update entity', () => {
      const payload = { data: { success: true, data: 'fake payload' } };
      expect(
        reducer(undefined, {
          type: SUCCESS(ACTION_TYPES.CREATE_BRIBED),
          payload,
        })
      ).toEqual({
        ...initialState,
        updating: false,
        updateSuccess: true,
        entity: payload.data.data,
      });
    });

    it('should delete entity', () => {
      const payload = null;
      const toTest = reducer(undefined, {
        type: SUCCESS(ACTION_TYPES.DELETE_BRIBED),
        payload,
      });
      expect(toTest).toMatchObject({
        updating: false,
        updateSuccess: true,
      });
    });
  });

  describe('Actions', () => {
    let store: any;

    const resolvedObject = { value: 'whatever' };
    beforeEach(() => {
      const mockStore = configureStore([thunk, promiseMiddleware]);
      store = mockStore({});
      axios.get = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.post = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.put = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.patch = sinon.stub().returns(Promise.resolve(resolvedObject));
      axios.delete = sinon.stub().returns(Promise.resolve(resolvedObject));
    });

    it('dispatches ACTION_TYPES.FETCH_BRIBED_LIST actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_BRIBED_LIST),
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_BRIBED_LIST),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getEntities()).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.FETCH_BRIBED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.FETCH_BRIBED),
        },
        {
          type: SUCCESS(ACTION_TYPES.FETCH_BRIBED),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(getEntity("1")).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.CREATE_BRIBED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.CREATE_BRIBED),
        },
        {
          type: SUCCESS(ACTION_TYPES.CREATE_BRIBED),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(createEntity({ _id: "1", queue: [1] })).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.UPDATE_BRIBED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.UPDATE_BRIBED),
        },
        {
          type: SUCCESS(ACTION_TYPES.UPDATE_BRIBED),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(updateEntity("1", { _id: "1", queue: [1] })).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.DELETE_BRIBED actions', async () => {
      const expectedActions = [
        {
          type: REQUEST(ACTION_TYPES.DELETE_BRIBED),
        },
        {
          type: SUCCESS(ACTION_TYPES.DELETE_BRIBED),
          payload: resolvedObject,
        },
      ];
      await store.dispatch(deleteEntity("1")).then(() => expect(store.getActions()).toEqual(expectedActions));
    });

    it('dispatches ACTION_TYPES.RESET actions', async () => {
      const expectedActions = [
        {
          type: ACTION_TYPES.RESET,
        },
      ];
      await store.dispatch(reset());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
