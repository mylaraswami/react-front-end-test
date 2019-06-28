import React, { Component } from "react";
import Login from "./components/Login/index";
import SignUp from "./components/SignUp/index";
import Dashboard from "./components/Dashboard";
import { store } from "./helpers";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Wrapper from "./components/Common/Wrapper";

const wrapperDashboard = Wrapper(Dashboard);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/dashboard" component={wrapperDashboard} />
            />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
