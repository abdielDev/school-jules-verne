import React, { useState } from 'react';
import school from '../images/school.png';
import '../styles/components/Register.scss';
import '../styles/components/Input.scss';
import '../styles/components/Button.scss';
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import firebase from '../js/config';
import UserContext from '../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
  let history = useHistory();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event, setUser) => {
    event.preventDefault();
    firebase.auth().signInWithEmailAndPassword(form.email, form.password)
      .then((result) => {
        setUser(result.user);
        history.push('/home');
      })
      .catch((error) => {
        console.log(error.message);
    });
    setForm({
      email: '',
      password: '',
      name: ''
    });
  };

  return (
    <div className="Register">
      <UserContext.Consumer>
        {
          (context) => (
            <form className="Register-container" onSubmit={(event) => handleSubmit(event, context.setUser)} >
              <div className="logo">
                <img src={school} alt="school logo"/>
                <div className="logo-name">
                  <h2>Jules Verne</h2>
                  <h2>School</h2>
                </div>
              </div>
              <div className="input">
                <input type="text" placeholder="Email" name="email" onChange={handleChange} value={form.email} />
                <FaUser />
              </div>
              <div className="input">
                <input type="password" placeholder="Password" name="password" onChange={handleChange} value={form.password} />
                <IoIosLock />
              </div>
              <button className="btn">Sign in</button>
              <Link to="/register">Don't have an account?</Link>
            </form>
          )
        }
      </UserContext.Consumer>
    </div>
  );
};

export default Login;