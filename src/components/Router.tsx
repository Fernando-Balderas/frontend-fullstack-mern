import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Description from "./Description";
import Books from "./Books";
import UpdateItem from "./Books/UpdateItem";
import NoMatchPath from "./NoMatchPath";

const Router: React.FC = () => {
  let location = useLocation();
  return (
    <Switch location={location}>
      <Route exact path="/">
        <Description />
      </Route>
      <Route exact path="/list">
        <Books allowDeletions={false} />
      </Route>
      <Route exact path="/create">
        <UpdateItem isNewItem />
      </Route>
      <Route exact path="/remove">
        <Books allowDeletions />
      </Route>
      <Route path="/update/:id">
        <UpdateItem isNewItem={false} />
      </Route>
      <Route path="*">
        <NoMatchPath />
      </Route>
    </Switch>
  );
};

export default Router;
