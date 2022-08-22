import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: [],
    isProcessing: false,
    error: false,
    errMessage: "",
    toggleTaskCreator: false,
    action: "",
    editingTask: null,
  },
  reducers: {
    actionType: (state, action) => {
      state.action = action.payload;
    },
    createTask: (state, action) => {
      state.isProcessing = true;
      state.allTasks = [...state.allTasks, action.payload];
    },
    taskToEdit: (state, action) => {
      state.editingTask = action.payload;
    },
    editTask: (state, action) => {
      // let item = state.allTasks.find((task) => task.id === action.payload.id);
      // if (item) {
      //   item = action.payload;
      // }
      // console.log(allTasks)
      const result = state.allTasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            description: action.payload.description,
            date: action.payload.date,
            time: action.payload.time,
            user: action.payload.user,
          };
        }
        return task;
      });
      console.log(result);
      state.allTasks = result;
    },
    deleteTask: (state) => {
      const result = state.allTasks.filter(
        (task) => task.id !== state.editingTask.id
      );
      state.allTasks = result;
    },
    taskCreated: (state) => {
      state.isProcessing = false;
      state.error = false;
    },
    throwError: (state, action) => {
      state.error = true;
      state.errMessage = action.payload;
    },
    openTaskCreator: (state) => {
      state.toggleTaskCreator = true;
    },
    closeTaskCreator: (state) => {
      state.toggleTaskCreator = false;
    },
  },
});

export const {
  createTask,
  taskCreated,
  throwError,
  openTaskCreator,
  closeTaskCreator,
  actionType,
  taskToEdit,
  editTask,
  deleteTask,
} = taskSlice.actions;
export default taskSlice.reducer;
