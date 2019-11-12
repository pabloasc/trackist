import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './todo.scss';
import { ToDoJSX } from './To-Do.jsx';
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

// let endpoint = "http://localhost:8080";
let endpoint = "https://nameless-shelf-29251.herokuapp.com";

export default function ToDoList(props)  {
  const [task, setTask] = useState("");
  const [items, setItems] = useState([]);

  useEffect(getTasks, []); // Pass empty array to only run once on mount.

  function handleTaskChange(e) {
    setTask(e.target.value);
  }

  function onSubmit() {
    if (task) {
      axios
        .post(
          endpoint + "/api/task",
          {
            task
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
    axios.get(endpoint + "/api/task").then(res => {
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

  function toggleDone(item) {
    if (item.status) {
      undoTask(item._id);
      console.log('undo');
    } else {
      updateTask(item._id);
      console.log('do');
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
        <Header className="header" as="h2">
          Trackist.io
        </Header>
      </div>
      <div className="row">
        <Form onSubmit={onSubmit}>
          <input
            type="text"
            className="input"
            name="task"
            value={task}
            onChange={handleTaskChange}
            placeholder="Create Task"
          />
        </Form>
      </div>
      <div className="row">
        <Card.Group>{items}</Card.Group>
      </div>
    </div>
  );

}
