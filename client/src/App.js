import React from "react";
import "./App.scss";
import { Container } from "semantic-ui-react";
import ToDoList from "./todo/To-Do";

export default function App() {
  return (
    <div>
      <Container>
        <ToDoList />
      </Container>
    </div>
  );
}
