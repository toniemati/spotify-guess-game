import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import { getTokenFromUrl } from '../../spotify';
import { useStateValue } from '../../StateProvider';

const SpotifyAuth = () => {
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    const { access_token } = getTokenFromUrl();

    if (!access_token)
      redirect();

    dispatch({
      type: 'SET_TOKEN',
      payload: access_token
    });

    history.push('/');
  }, []);

  const redirect = () => {
    history.push('/login');
  }

  return (
    <div className="auth">
      <h1>Authentication</h1>
    </div>
  )
}

export default SpotifyAuth
