import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { WordstatState } from "./types";

const getState = (rootState: RootState): WordstatState => rootState.wordstat;

const getSearchQueries = createSelector(
    getState,
    ({ searchQueries }) => searchQueries
)

export {
    getSearchQueries
}