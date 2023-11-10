import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout, selectToken } from '../Auth/authSlice'

function Navigations() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectToken);
 
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav>
      <p>
        <NavLink to="/">Home</NavLink>
      </p>

      {token ? (
        <>
          <p>
            <NavLink to='/account'>Profile</NavLink>
          </p>
          <p>
            <a onClick={handleLogout}><u>Logout</u></a>
          </p>
        </>
      ) : (
        <p>
          <NavLink to="/login">Log in</NavLink>
        </p>
      )}
    </nav>
  )
}

export default Navigations