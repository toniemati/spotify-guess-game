import { Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import './Header.css';
import { useHistory } from 'react-router'; 

const Header = () => {
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [showUserName, setShowUserName] = useState(true);

  const handleLogout = () => {
    dispatch({
      type: 'SET_USER',
      payload: null
    });
  }

  useEffect(() => {
    if (!user)
      history.push('/login');

  }, [user]);

  return (
    <div className="header">
      <div className="header__links">
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
        <Link to="/stats">Stats</Link>
      </div>

      <Link className="header__user" to={`/me`}>
        <p onClick={handleLogout} onMouseLeave={() => setShowUserName(true)} onMouseOver={() => setShowUserName(false)}>{showUserName ? user?.display_name : 'Logout'}</p>
        <Avatar src={user?.images[0].url} alt={user?.display_name} />
      </Link>
    </div>
  )
}

export default Header
