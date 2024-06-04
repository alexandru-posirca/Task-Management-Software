import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

 const sliceBoards = createSlice( {
  name: 'boards',
  initialState: data.boards,
  reducers: {

  }
})

export default sliceBoards