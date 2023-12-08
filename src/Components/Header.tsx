import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import '../assets/Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { SWIFT_LOGO } from '../constants';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firbase';
import { addUser , removeUser} from '../utils/userSlice';

interface HeaderProps {
  isSignIn : boolean
}

const Header : React.FC<HeaderProps> = ({ isSignIn}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/');
    })
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          
          const {uid , email } = user;
          dispatch( addUser({uid : uid, email : email}) )
         navigate('/dashboard');
        } else {
          // User is signed out
          dispatch(removeUser())
          navigate('/');
        }
      });
    
})

  return (
    <div className="header">
      <img src={SWIFT_LOGO} alt="swift-logo" className='swift-logo'  />
      <h3 className={ !isSignIn ? '' : 'Logout'} onClick={handleLogout}> { !isSignIn ? '' : 'Logout'}</h3>
   </div>
  );
};

export default Header;
