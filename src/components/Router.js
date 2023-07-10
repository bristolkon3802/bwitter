import { HashRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

/* 
미인증 : <Home />
인증 : <Auth />
*/

const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <Home userObj={userObj} />
                        </Route> 
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    </>
                ) : ( 
                    <>
                        <Route exact path="/">
                            <Auth />
                        </Route> 
                    </>
                )};
            </Switch>
        </Router>
    );
};

export default AppRouter;