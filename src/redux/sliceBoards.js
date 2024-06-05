import { createSlice } from "@reduxjs/toolkit";
import data from "../data/data.json";

 const sliceBoards = createSlice( {
  name: 'boards',
  initialState: data.boards,
  reducers: {
    addTask: (state, action) => {
      const { titleTask, statusTask, descriptionTask, subTasks, newColIndex } =
        action.payload;
      const task = { titleTask, descriptionTask, subTasks, statusTask };
      const board = state.find((board) => board.statusActive);
      const column = board.columnsList.find((col, index) => index === newColIndex);
      column.tasksList.push(task);
    },
    editTask: (state, action) => {
      const {
        titleTask,
        statusTask,
        descriptionTask,
        subTasks,
        prevColIndex,
        newColIndex,
        taskIndex,
      } = action.payload;
      const board = state.find((board) => board.statusActive);
      const column = board.columnsList.find((col, index) => index === prevColIndex);
      const task = column.tasksList.find((task, index) => index === taskIndex);
      task.title = titleTask;
      task.status = statusTask;
      task.description = descriptionTask;
      task.subtasks = subTasks;
      if (prevColIndex === newColIndex) return;
      column.tasksList = column.tasksList.filter((task, index) => index !== taskIndex);
      const newCol = board.columnsList.find((col, index) => index === newColIndex);
      newCol.tasksList.push(task);
    },
  }
})

export default sliceBoards