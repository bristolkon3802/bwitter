import { HashRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

/* 
미인증 : <Home />
인증 : <Auth />
*/
const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <div style={{maxWidth:890, width:"100%", margin:"0 auto", marginTop:80, display:"flex", justifyContent:"center",}}>
                            <Route exact path="/">
                                <Home userObj={userObj} />
                            </Route> 
                            <Route exact path="/profile">
                                <Profile userObj={userObj} refreshUser={refreshUser} />
                            </Route>
                        </div>
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