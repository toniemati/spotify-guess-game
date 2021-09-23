import { Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import './Header.css';
import { useHistory, useLocation } from 'react-router'; 

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const { pathname: currentPath } = useLocation();
  const [showUserName, setShowUserName] = useState(true);

  const handleLogout = () => {
    dispatch({
      type: 'SET_TOKEN',
      payload: null
    });

    dispatch({
      type: 'SET_USER',
      payload: null
    });

    dispatch({
      type: 'SET_SPOTIFY',
      payload: null
    });

    dispatch({
      type: 'SET_PLAYLISTS',
      payload: []
    });
  }

  useEffect(() => {
    if (!user)
      history.push('/login');

  }, [user, history]);

  return (
    <div className="header">
      <div className="header__links">
        <Link className={currentPath === '/' ? 'active': null} to="/">Home</Link>
        <Link className={currentPath === '/game' ? 'active': null} to="/game">Game</Link>
        <Link className={currentPath === '/stats' ? 'active': null} to="/stats">Stats</Link>
      </div>

      <div className="header__user">
        <p onClick={handleLogout} onMouseLeave={() => setShowUserName(true)} onMouseOver={() => setShowUserName(false)}>{showUserName ? user?.display_name : 'Logout'}</p>
        <Avatar src={user?.images[0].url} alt={user?.display_name} />
      </div>
    </div>
  )
}

export default Header
