import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import SplashLanding from "./components/SplashPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import NoteList from "./components/NoteList";
import NoteDetails from "./components/NoteDetails";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const authenticated = useSelector(state => state.session.user !== null);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {authenticated && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/" render={() => (
            authenticated ? (
              <Redirect to="/notes" />
            ) : (
              <SplashLanding />
            )
          )} />
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/notes" component={NoteList} />
          <Route exact path="/notes/:noteId" component={NoteDetails} />
          <Redirect to="/" />
        </Switch>
      )}
    </>
  );
}

export default App;