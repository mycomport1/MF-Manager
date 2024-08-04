import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ClientList from './ClientList';
import LoanApplication from './LoanApplication';
import RepaymentSchedule from './RepaymentSchedule';

const Routes = () => (
  <Switch>
    <Route path="/client-list" component={ClientList} />
    <Route path="/loan-application" component={LoanApplication} />
    <Route path="/repayment-schedule" component={RepaymentSchedule} />
    <Route exact path="/" component={ClientList} />
  </Switch>
);

const App = () => {
  return (
    <Router>
      <div>
        <Routes />
      </div>
    </Router>
  );
}

export default App;