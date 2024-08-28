import React, { useState } from "react";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './screens/HomePage/HomePage';
// import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from "./screens/LoginScreens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreens/RegisterScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/CreateNote/SingleNote";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const App = () => {

  const [search, setSearch] = useState("");
  // console.log('====================================');
  // console.log(search);
  // console.log('====================================');

  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <Switch>
        <main>

          <Route exact path='/' component={HomePage} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/profile' component={ProfileScreen} />
          <Route exact path='/register' component={RegisterScreen} />
          <Route exact path='/createnote' component={CreateNote} />
          <Route exact path='/note/:id' component={SingleNote} />
          <Route path='/mynotes' component={() => <MyNotes search={search} />} />
        </main>
      </Switch>
      <Footer />
    </BrowserRouter>
  )
};

export default App;
