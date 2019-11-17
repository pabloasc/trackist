import React, { useState } from "react";
import "./App.scss";
import { Container } from "semantic-ui-react";
import Header from "./Header";
import ToDoList from "./todo/To-Do";

import { AuthProvider } from './Auth';

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Header />

        <Container>
          <ToDoList />
        </Container>

      </div>
    </AuthProvider>
  );
};

export default App;
