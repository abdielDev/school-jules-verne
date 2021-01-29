import React, { useContext, useState } from 'react';
import school from '../images/school.png';
import '../styles/components/Register.scss';
import '../styles/components/Input.scss';
import '../styles/components/Button.scss';
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import firebase from '../js/config';
import UserContext from '../context/UserContext';
import { Link, useHistory } from 'react-router-dom';

const Register = () => {
  let history = useHistory();
  let { setSchedule  } = useContext(UserContext);
  let formatSchedule = {
    'Mon07': null,
    'Mon08': null,
    'Mon09': null,
    'Mon10': null,
    'Mon11': null,
    'Mon12': null,
    'Mon13': null,
    'Tue07': null,
    'Tue08': null,
    'Tue09': null,
    'Tue10': null,
    'Tue11': null,
    'Tue12': null,
    'Tue13': null,
    'Wed07': null,
    'Wed08': null,
    'Wed09': null,
    'Wed10': null,
    'Wed11': null,
    'Wed12': null,
    'Wed13': null,
    'Thu07': null,
    'Thu08': null,
    'Thu09': null,
    'Thu10': null,
    'Thu11': null,
    'Thu12': null,
    'Thu13': null,
    'Fri07': null,
    'Fri08': null,
    'Fri09': null,
    'Fri10': null,
    'Fri11': null,
    'Fri12': null,
    'Fri13': null,
  };

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event, setUser) => {
    event.preventDefault();
    
    firebase.auth().createUserWithEmailAndPassword(form.email, form.password)
      .then((result) => {
        const scheduleRef = firebase.firestore().collection('schedules').doc(result.user.uid);
        result.user.updateProfile({
          displayName: form.name,
        }).then(function() {
          // Update successful.
          setUser(result.user);
          scheduleRef.set(formatSchedule)
            .then(() => setSchedule(formatSchedule))
            .then(() => history.push('/home'))
        }).catch(function(error) {
          // An error happened.
          console.log(error);
        });
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
              <div className="input">
                <input type="text" placeholder="Name" name="name" onChange={handleChange} value={form.name} />
                <IoIosLock />
              </div>
              <button className="btn">Sign up</button>
              <Link to="/login">Already have an account?</Link>
            </form>
          )
        }
      </UserContext.Consumer>
    </div>
  );
};

export default Register;