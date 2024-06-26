import { createSlice } from "@reduxjs/toolkit";
import data from "/public/data/data.json";

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
      task.titleTask = titleTask;
      task.statusTask = statusTask;
      task.descriptionTask = descriptionTask;
      task.subTasks = subTasks;
      if (prevColIndex === newColIndex) return;
      column.tasksList = column.tasksList.filter((task, index) => index !== taskIndex);
      const newCol = board.columnsList.find((col, index) => index === newColIndex);
      newCol.tasksList.push(task);
    },
    setSubTaskCompleted: (state, action) => {
      const payload = action.payload;
      const board = state.find(board => board.statusActive);
      const col = board.columnsList.find((col, i) => i === payload.colIndex);
      const task = col.tasksList.find((task, i) => i === payload.taskIndex);
      const subtask = task.subTasks.find((subtask, i) => i === payload.index);
      subtask.statusCompleted = !subtask.statusCompleted;
    },
    setTaskStatus: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.statusActive);
      const columns = board.columnsList;
      const col = columns.find((col, i) => i === payload.colIndex);
      if (payload.colIndex === payload.newColIndex) return;
      const task = col.tasksList.find((task, i) => i === payload.taskIndex);
      task.statusTask = payload.status;
      col.tasksList = col.tasksList.filter((task, i) => i !== payload.taskIndex);
      const newCol = columns.find((col, i) => i === payload.newColIndex);
      newCol.tasksList.push(task);
    },
    deleteTask: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.statusActive);
      const col = board.columnsList.find((col, i) => i === payload.colIndex);
      col.tasksList = col.tasksList.filter((task, i) => i !== payload.taskIndex);
    },
    editBoard: (state, action) => {
      const payload = action.payload;
      const board = state.find((board) => board.statusActive);
      board.nameBoard = payload.nameBoard;
      board.columnsList = payload.newColumnsList;
    },
    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const board = state.find((board) => board.statusActive);
      const prevCol = board.columnsList.find((col, i) => i === prevColIndex);
      const task = prevCol.tasksList.splice(taskIndex, 1)[0];
      board.columnsList.find((col, i) => i === colIndex).tasksList.push(task);
    },
  }
})

export default sliceBoards