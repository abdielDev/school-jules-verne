import '../styles/reset.scss';
import '../styles/App.scss';
import Header from './Header';
import SubjectList from './SubjectList';
import Footer from './Footer';
import Register from './Register';
import UserContext from '../context/UserContext';
import { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login';
import firebase from '../js/config';
import SubjectContext from '../context/SubjectContext';

function App() {

  const [user, setUser] = useState(firebase.auth().currentUser);
  const [schedule, setSchedule] = useState({});
  const [subjects, setSubjects] = useState([]);

  const userData = {
    user,
    setUser: (user) => setUser(user),
    schedule,
    setSchedule: (schedule) => setSchedule(schedule),
  };

  const subjectsData = {
    subjects,
    setSubjects: (subjects) => setSubjects(subjects),
  }

  useEffect(() => {
    if(user) {
      firebase.firestore().collection('subjects').orderBy('folio', 'asc').get()
      .then((querySnapshot) => {
        setSubjects(querySnapshot.docs);
      });
      !schedule && firebase.firestore().collection('schedules').doc(user.uid).get()
        .then((doc) => setSchedule(doc.data()));
    }
  }, [user, schedule])

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <Switch>
          <Route exact path={['/login', '/']} >
            <Login />
          </Route>
          <Route exact path="/home" >
            {
              user ?
              <>
                <Header />
                <SubjectContext.Provider value={subjectsData}>
                  <SubjectList />
                </SubjectContext.Provider>
                <Footer />
              </> :
              <Redirect to="/login" />
            }
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
