import React from 'react';
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";

export const ToDoJSX = (component) => {
  return (
    <Card key={component.item._id} color={component.color} className="task" fluid>
      <Card.Content>
        <input
          type="checkbox"
          onClick={() => component.toggleDone(component.item)}
          checked={component.item.status ? true : false}
        />
        <span className={component.item.status ? "completed-task" : ""}>
          {component.item.task}
        </span>
        <Icon
          className="task__icon-delete"
          name="delete"
          onClick={() => component.deleteTask(component.item._id)}
          />
      </Card.Content>
    </Card>
  )
}
