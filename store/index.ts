import { createStore, applyMiddleware, AnyAction } from "redux";
import thunkMiddleware from "redux-thunk";
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
export const fetchAllAirports = () => {
  return async (dispatch: AnyAction) => {
    const response = await axios.get("/api/us-airports");
    const airports = await response.data.data.response;
    console.log("STORE STORE STORE:", airports);
    dispatch(_fetchAllAirports(airports));
  };
};

export const fetchAllAirportsFromJSON = () => {
  return async (dispatch: AnyAction) => {
    const response = await axios.get("/api/staticdata");
    const airports = await JSON.parse(response.data).data.response;
    // console.log("STORE STORE STORE:", airports);
    dispatch(_fetchAllAirports(airports));
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

export default wrapper;
