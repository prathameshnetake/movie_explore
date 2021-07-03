import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";
import { Provider } from "react-redux";
import { store } from "./store";
import { Nav } from "./components/Nav";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="parent-grid">
          <div className="app-main">
            <Nav />
            <Switch>
              <Route exact path="/:movie_id">
                <Movie />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
