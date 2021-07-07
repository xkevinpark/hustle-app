import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";

import CreateUser from "./components/createUser.js";
import CreateExercise from "./components/createExercise.js";
import ExerciseList from "./components/exerciseList.js";
import UpdateExercise from "./components/updateExercise.js";
import NavBar from "./components/navbar.js"

export default function App() {
  return (
    <BrowserRouter>
      <div className="container"> 
      <NavBar />
      <br/>
      <Route exact path="/" component={ExerciseList} />
      <Route path="/create" component={CreateExercise} />
      <Route path="/user" component={CreateUser} />
      <Route path="/edit/:id" component={UpdateExercise} />
      </div>
    </BrowserRouter>
  );
};
