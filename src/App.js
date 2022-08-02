import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import Progress from "./shared/components/UIElements/Progress";
import "./App.css";

const Auth = React.lazy(() => import("./User/pages/Auth"));
const Dashboard = React.lazy(() => import("./dashboard/pages/Dashboard"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Redirect to="/dashboard/home" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/">
          <Auth />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <main>
          <Suspense
            fallback={
              <div className="center">
                <Progress asOverlay />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
