import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import LoginPage from './views/LoginPage/LoginPage';
import {useStateValue} from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  console.log(user);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/me">
            <Header />
            <h1>Me page</h1>
          </Route>

          <Route path="/stats">
            <Header />
            <h1>Stats here</h1>
          </Route>

          <Route path="/game">
            <Header />
            <h1>Game here</h1>
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/">
            <Header />
            <h1>home hape</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
