import './LoginPage.css';
import { loginUrl } from '../../spotify';
import { useStateValue } from '../../StateProvider';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

const LoginPage = () => {
  const [{ token, user }] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    if (token, user)
      history.push('/');
  }, [token, user]);

  return (
    <div className="loginPage">
      <a href={loginUrl}>Login with spotify</a>
    </div>
  )
}

export default LoginPage
