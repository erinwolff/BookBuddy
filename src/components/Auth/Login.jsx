import { useState } from 'react'
import { useLoginMutation, useRegisterMutation } from './authSlice'
import { useNavigate } from 'react-router-dom'


function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const authAction = isLogin ? 'Login' : 'Register';
  const altCopy = isLogin
    ? 'Need an account? Register here.'
    : 'Already have an account? Login here.';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authMethod = isLogin ? login : register;
    const credentials = { firstname, lastname, email, password };

    setError(null);
    setLoading(true);

    try {
      await authMethod(credentials).unwrap();
      setTimeout(() => {
        navigate('/books')
      }, 800);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };


  return (
    <>
      <div className="login-container">
        <h1>{authAction}</h1>
        <form className="login-contents" onSubmit={handleSubmit}>
          <label>
            First Name:
          </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
          />

          <label>
            Last Name:
          </label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
          />

          <label>
            Email:
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />

          <label>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button>{authAction}</button>
        </form>
        <a onClick={() => setIsLogin(!isLogin)}>{altCopy}</a>
        {loading && <p>Logging in ...</p>}
        {error && <p>{error.data.message}</p>}
      </div>
    </>
  );
}

export default Login