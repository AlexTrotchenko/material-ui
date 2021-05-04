import Header from "./ui/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route exact path="/services" component={() => <div>Services</div>} />
          <Route
            exact
            path="/theRevolution"
            component={() => <div>The Revolution</div>}
          />
          <Route exact path="/aboutUs" component={() => <div>About us</div>} />
          <Route
            exact
            path="/freeEstimate"
            component={() => <div>Free Estimate</div>}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
