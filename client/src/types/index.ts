export interface IAppState {
  tablePage: number;
  setTablePage: (payload: number) => void;
  tableRowsPerPage: number;
  setTableRowsPerPage: (payload: number) => void;
}

export interface IActionState {
  type: string;
  payload: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface ICreateUserInputs {
  email: string;
  name: string;
}

export interface IUpdateUserInputs {
  email?: string;
  name?: string;
}

export type DialogType = '' | 'view' | 'update' | 'delete';

export const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SET_TABLE_PAGE = 'SET_TABLE_PAGE';
export const SET_TABLE_ROWS_PER_PAGE = 'SET_TABLE_ROWS_PER_PAGE';
