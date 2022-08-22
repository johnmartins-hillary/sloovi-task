import React, { useState, useEffect } from "react";
import "../styles/CreateTask.css";
import { BiPlus, BiLoaderCircle } from "react-icons/bi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  actionType,
  closeTaskCreator,
  createTask,
  editTask,
  openTaskCreator,
  taskCreated,
  taskToEdit,
  throwError,
  deleteTask,
} from "../redux/taskRedux";
import { useSelector } from "react-redux";
import uuid from "react-uuid";

function CreateTask() {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    description: "",
    date: "",
    time: "",
    user: "",
  });
  const {
    allTasks,
    isProcessing,
    error,
    errMessage,
    toggleTaskCreator,
    action,
    editingTask,
  } = useSelector((state) => state.tasks);

  const onChangeHandler = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (action === "create") {
      if (
        !newTask.description ||
        !newTask.date ||
        !newTask.time ||
        !newTask.user
      ) {
        dispatch(throwError("Please fill all fields"));
      } else {
        dispatch(createTask({ ...newTask, id: uuid(), timestamp: new Date() }));
        dispatch(taskCreated());
      }
    } else {
      dispatch(
        editTask({
          ...editingTask,
          description: newTask.description
            ? newTask.description
            : editingTask.description,
          date: newTask.date ? newTask.date : editingTask.date,
          time: newTask.time ? newTask.time : editingTask.time,
          user: newTask.user ? newTask.user : editingTask.user,
        })
      );
    }
  };

  const users = [
    {
      id: 1,
      name: "Prem Kumar",
    },
    {
      id: 2,
      name: "john hills",
    },
    {
      id: 3,
      name: "preya veer",
    },
    {
      id: 4,
      name: "will smith",
    },
    {
      id: 5,
      name: "rose mary",
    },
  ];

  useEffect(() => {
    dispatch(throwError(""));
    dispatch(actionType(""));
    dispatch(taskToEdit(null));
  }, [dispatch]);

  return (
    <div className="container">
      <div className="header">
        <div>Tasks {allTasks?.length}</div>
        <BiPlus
          onClick={() => {
            dispatch(taskToEdit(null));
            dispatch(actionType("create"));
            dispatch(openTaskCreator());
          }}
        />
      </div>
      {toggleTaskCreator && action && (
        <div className="child">
          <div className="body">
            <div className="description">
              <label>Task Description</label>
              <input
                type="text"
                onChange={onChangeHandler}
                name="description"
                defaultValue={editingTask ? editingTask?.description : ""}
              />
            </div>
            <div className="duration">
              <div className="date">
                <label>Date</label>
                <input
                  type="date"
                  onChange={onChangeHandler}
                  name="date"
                  defaultValue={editingTask ? editingTask?.date : ""}
                />
              </div>
              <div className="time">
                <label>Time</label>
                <input
                  type="time"
                  onChange={onChangeHandler}
                  name="time"
                  defaultValue={editingTask ? editingTask?.time : ""}
                />
              </div>
            </div>
            <div className="select-user">
              <label>Assign User</label>
              <select
                onChange={onChangeHandler}
                name="user"
                defaultValue={editingTask ? editingTask?.user : ""}
              >
                {users.map((user, index) => (
                  <option key={user + index}>{user.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="footer">
            <RiDeleteBinLine onClick={() => dispatch(deleteTask())} />
            <div>
              <button onClick={() => dispatch(closeTaskCreator())}>
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disbled={isProcessing}
                className="save"
              >
                {" "}
                {isProcessing ? <BiLoaderCircle /> : "Save"}
              </button>
            </div>
          </div>
          <div className="error">{error && errMessage}</div>
        </div>
      )}
    </div>
  );
}

export default CreateTask;
