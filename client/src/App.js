import './App.css';
import {Route, BrowserRouter, Switch} from "react-router-dom"
import landing from './views/landing/landing';
import Home from './views/home/home';
import create from './views/create/create';
import Details from './views/details/details';
import navbar from './components/navbar/navbar';




function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={landing}/>
        <Route>
        <Route path={"*"} component={navbar}/>
            <Switch>
              <Route path={"/home"} component={Home} />
              <Route path={"/create"} component={create} />
              <Route path={"/details/:id"} component={Details} />
            </Switch>
          </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
