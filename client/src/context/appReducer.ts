import {
  SET_TABLE_PAGE,
  SET_TABLE_ROWS_PER_PAGE,
  IAppState,
  IActionState
} from '../types';

const handlers: any = {
  [SET_TABLE_PAGE]: (state: IAppState, payload: number): IAppState => {
    return {
      ...state,
      tablePage: payload
    };
  },
  [SET_TABLE_ROWS_PER_PAGE]: (state: IAppState, payload: number): IAppState => {
    return {
      ...state,
      tableRowsPerPage: payload
    };
  },
  DEFAULT: (state: IAppState): IAppState => state
};

export const appReducer = (state: IAppState, action: IActionState) => {
  const handler = (handlers as any)[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};
