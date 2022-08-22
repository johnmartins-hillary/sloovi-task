import React, { useState, useEffect } from "react";
import "../styles/Alltasks.css";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { actionType, openTaskCreator, taskToEdit } from "../redux/taskRedux";
import { useDispatch } from "react-redux";

function AllTasks() {
  const { allTasks } = useSelector((state) => state.tasks);
  const [tasks, setTasks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const sortedtasks = allTasks
      ?.map((obj) => {
        return { ...obj, timestamp: new Date(obj.timestamp) };
      })
      .sort((a, b) => b.timestamp - a.timestamp);
    setTasks(sortedtasks);
  }, [allTasks]);

  return (
    <div className="task-container">
      {tasks.length ? tasks?.map((task, index) => (
        <div className="task" key={index + task}>
          <div className="top">{task.description}</div>
          <div className="bottom">
            <div className="left-content">
              <div>{task.user}</div>
              <div>
                {task.date} | {task.time}
              </div>
            </div>
            <div className="right-content">
              <FaEdit
                onClick={() => {
                  dispatch(actionType("edit"));
                  dispatch(taskToEdit(task));
                  dispatch(openTaskCreator());
                }}
              />
            </div>
          </div>
        </div>
      )) : "No task created yet"}
    </div>
  );
}

export default AllTasks;
