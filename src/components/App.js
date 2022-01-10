import Header from "./ui/Header";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { Records } from "../pages/records/Records";
import RecordDetails from "../pages/recordDetail/recordDetail";
import ModalManager from "./modals/ModalManager";
function App() {
  return (
    <>
      <Router>
        <ModalManager />
        <Header />
        <Switch>
          <Route exact path="/" component={Records} />

          <Route exact path="/records/:id" component={RecordDetails} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
