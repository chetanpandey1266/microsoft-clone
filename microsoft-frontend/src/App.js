import Login01 from "./components/Loginup/Login01";
import MainPage from "./components/MainPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login02 from "./components/Loginup/Login02";
import User from "./components/User";
import Signup01 from "./components/Loginup/Signup01";
import Signup02 from "./components/Loginup/Signup02";

function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact component={MainPage} />
                    <Route path="/signin01" component={Login01} />
                    <Route path="/signin02" component={Login02} />
                    <Route path="/user" component={User} />
                    <Route path="/signup01" component={Signup01} />
                    <Route path="/signup02" component={Signup02} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
