import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={{ wordWrap: "break-word" }}>{item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="check circle"
                      color="green"
                      onClick={() => updateTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Done</span>
                    <Icon
                      name="undo"
                      color="yellow"
                      onClick={() => undoTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Undo</span>
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => deleteTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          })
        )
      } else {
        setItems([]);
      }
    });
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
          <Input
            type="text"
            name="task"
            value={task}
            fluid
            onChange={handleTaskChange}
            placeholder="Create Task"
          />
          {/* <Button >Create Task</Button> */}
        </Form>
      </div>
      <div className="row">
        <Card.Group>{items}</Card.Group>
      </div>
    </div>
  );

}
