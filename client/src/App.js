import React from "react";
import "./App.scss";
import { Container } from "semantic-ui-react";
import ToDoList from "./To-Do-List";

export default function App() {
  return (
    <div>
      <Container>
        <ToDoList />
      </Container>
    </div>
  );
}
