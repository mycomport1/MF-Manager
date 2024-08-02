import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import ClientList from './ClientList';
import LoanApplication from './LoanApplication';
import RepaymentSchedule from './RepaymentSchedule';
const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/client-list">
            <ClientList />
          </Route>
          <Route path="/loan-application">
            <LoanApplication />
          </Route>
          <Route path="/repayment-schedule">
            <RepaymentSchedule />
          </Route>
          <Route path="/">
            <ClientList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;