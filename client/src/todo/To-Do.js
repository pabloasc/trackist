import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './todo.scss';
import { ToDoJSX } from './To-Do.jsx';
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import { AuthContext } from '../Auth';

let endpoint = "http://localhost:8080";
// let endpoint = "https://nameless-shelf-29251.herokuapp.com";

export default function ToDoList(props)  {
  const { currentUser } = useContext(AuthContext);
  const [task, setTask] = useState({});
  const [items, setItems] = useState([]);

  useEffect(getTasks, []); // Pass empty array to only run once on mount.

  function handleTaskChange(e) {
    setTask(e.target.value);
  }

  function onSubmit() {
    if (task && currentUser) {
      axios
        .post(
          endpoint + "/api/task",
          {
            task,
            user: currentUser.uid
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(res => {
          getTasks();
          setTask('')
        });
    }
  }

  function getTasks() {
    if (currentUser) {
      axios.get(endpoint + "/api/task" + ((currentUser && currentUser.uid) ? '/' + currentUser.uid : '') ).then(res => {
        if (res.data) {
          setItems(
            res.data.map(item => {
              let color = "yellow";

              if (item.status) {
                color = "green";
              }
              return (
                <ToDoJSX color={color} item={item} toggleDone={toggleDone} deleteTask={deleteTask}/>
              );
            })
          )
        } else {
          setItems([]);
        }
      });
    }
  }

  function toggleDone(item) {
    if (item.status) {
      undoTask(item._id);
    } else {
      updateTask(item._id);
    }
  }

  function updateTask(id) {
    axios
      .put(endpoint + "/api/task/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        getTasks();
      });
  }

  function undoTask(id) {
    axios
      .put(endpoint + "/api/undoTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        getTasks();
      });
  }

  function deleteTask(id) {
    axios
      .delete(endpoint + "/api/deleteTask/" + id, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
      .then(res => {
        getTasks();
      });
  }

  return (
    <div>
      <div className="row">
      </div>
      <div className="row">
        <div className="field">
          <Form onSubmit={onSubmit} autoComplete="off">
            <input
              type="text"
              className="input"
              name="task"
              value={task.text}
              onChange={handleTaskChange}
              placeholder="Create Task"
            />
          </Form>
        </div>
      </div>
      <div className="row">
        <Card.Group>{items}</Card.Group>
      </div>
    </div>
  );

}
