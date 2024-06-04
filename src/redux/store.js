import { configureStore } from "@reduxjs/toolkit";
import sliceBoards from "./sliceBoards";

const store = configureStore({
  reducer : {
    boards: sliceBoards.reducer,
  }
})

export default store