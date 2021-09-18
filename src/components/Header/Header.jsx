import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="header__links">
        <Link to="/">Home</Link>
        <Link to="/game">Game</Link>
        <Link to="/stats">Stats</Link>
      </div>

      <Link className="header__user" to={`/me`}>
        <p>toniemati</p>
        <Avatar src="" alt="user" />
      </Link>
    </div>
  )
}

export default Header
