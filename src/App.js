import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';

import Header from './components/Header/Header';
import LoginPage from './views/LoginPage/LoginPage';
import SpotifyAuth from './components/SpotifyAuth/SpotifyAuth';

import SpotifyWebApi from 'spotify-web-api-js';
import HomePage from './views/GamePage/HomePage';

const spotify = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    if (!token) return;

    spotify.setAccessToken(token);

    spotify
      .getMe()
      .then((user) => {
        const { id } = user;

        dispatch({
          type: 'SET_USER',
          payload: user
        });

        spotify
          .getUserPlaylists(id, { limit: 50 })
          .then(({ items }) => {
            dispatch({
              type: 'SET_PLAYLISTS',
              payload: items
            });
          })
      });

  }, [token]);

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

          <Route path="/auth">
            <SpotifyAuth />
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/">
            <Header />
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
