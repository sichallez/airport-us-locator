import {
  createStore,
  applyMiddleware,
  AnyAction,
  Dispatch,
  Action,
  ActionCreator,
} from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Store } from "@reduxjs/toolkit";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";

import axios from "axios";

const initialState: any[] = [];

const GET_ALL_AIRPORTS = "GET_ALL_AIRPORTS";

/* Action Creators */
const _fetchAllAirports = (airports: any[]) => {
  return {
    type: GET_ALL_AIRPORTS,
    payload: airports,
  };
};

/* Thunk */
export const fetchAllAirports = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const response = await axios.get("/api/us-airports");
    // const airports = await response.data.data.response;
    const airports = await response.data.data;
    console.log("STORE STORE STORE:", airports);
    dispatch<any>(_fetchAllAirports(airports));
  };
};

export const fetchAllAirportsFromJSON = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    const response = await axios.get("/api/staticdata");
    const airports = await JSON.parse(response.data).data.response;
    // console.log("STORE STORE STORE:", airports);
    dispatch<any>(_fetchAllAirports(airports));
  };
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_AIRPORTS:
      return action.payload;
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
const makeStore = (context: Context) => store;
const wrapper = createWrapper(makeStore, { debug: true });

export type AppDispatch = typeof store.dispatch;

export default wrapper;
