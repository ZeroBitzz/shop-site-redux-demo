import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";

import Home from "./pages/Home";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import { StoreProvider } from "./utils/GlobalState";
import OrderHistory from "./pages/OrderHistory";
import Success from "./pages/Success";

const client = new ApolloClient({
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${localStorage.getItem("id_token") || ""}`,
      },
    });
  },
  uri: "/graphql",
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <StoreProvider>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/orderHistory" component={OrderHistory} />
          <Route exact path="/products/:id" component={Detail} />
          <Route exact path="/success" component={Success} />
          <Route component={NoMatch} />
        </Switch>
      </StoreProvider>
    </Router>
  </ApolloProvider>
);

export default App;
