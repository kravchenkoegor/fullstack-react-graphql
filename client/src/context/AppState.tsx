import React, { useReducer } from 'react';
import { AppContext } from './AppContext';
import { appReducer } from './appReducer';
import { SET_TABLE_PAGE, SET_TABLE_ROWS_PER_PAGE, IAppState } from '../types';

export const AppState: React.FC = ({ children }) => {
  const [state, dispatch]: [
    IAppState,
    React.Dispatch<{ type: string; payload: number }>
  ] = useReducer(appReducer, {
    tablePage: 0,
    tableRowsPerPage: 5
  });

  const setTablePage = (payload: number): void => {
    dispatch({ type: SET_TABLE_PAGE, payload });
  };
  const setTableRowsPerPage = (payload: number): void => {
    dispatch({ type: SET_TABLE_ROWS_PER_PAGE, payload });
  };

  // create new object to prevent re-render
  const value: IAppState = Object.assign(
    { setTablePage, setTableRowsPerPage },
    state
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
