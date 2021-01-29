import '../styles/components/Header.scss';
import logo from '../images/darkSchool.png';
import { VscSearch } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";
import UserContext from '../context/UserContext';
import firebase from '../js/config';
import { useHistory } from 'react-router-dom';

const Header = () => {
  let history = useHistory();
  const handleClick = (setUser) => {
    firebase.auth().signOut()
    .then(() => {
      setUser(firebase.auth().currentUser);
      history.push('/login');
    })
  };
  return (
    <header className="App-header">
      <div className="wrapped">
        <div className="header-containerLogo">
          <img src={logo} className="header-containerLogo-logo" alt="logo" />
          <div className="header-containerLogo-appName">
            <h2>Jules Verne</h2>
            <h2>School</h2>
          </div>
        </div>
        <div className="header-search">
          <input type="text" placeholder="Search" />
          <span><VscSearch /></span>
        </div>
        <div className="header-user">
          <FaUserAlt />
          <UserContext.Consumer>
            {
              context => (
                <>
                  <h1>{context.user.displayName}</h1>
                  <div className="options">
                    <button onClick={() => handleClick(context.setUser)}>Sign out</button>
                  </div>
                </>
              )
            }
          </UserContext.Consumer>
        </div>
      </div>
    </header>
  );
};

export default Header;