import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import PopUp from './PopUp';
import firebase from '../firebase/config';
import SubjectContext from '../context/SubjectContext';

const PopUpResume = ({ selected, setSubjectSelected, setShowModal }) => {
  const { schedule, user, setSchedule } = useContext(UserContext);
  const { subjects } = useContext(SubjectContext);
  const [error, setError] = useState(false);
  const handleSubscribe = () => {
    if(!selected.get('places')) {
      return setError('Classroom full');
    };
    let overWritten = false;
    selected.data().schedule.forEach(time => {
      if(schedule[time]) {
        overWritten = true;
      }
    });
    if(overWritten) return setError('Schedule with no space');
    let scheduleObject = schedule;
    selected.data().schedule.forEach(time => {
      scheduleObject = {
        ...scheduleObject,
        [time]: selected.data().folio
      };
    });
    let subjectObject = {
      ...selected.data(),
      places: selected.data().places - 1
    };
    let idx = subjects.findIndex((element) => element.id === selected.id);
    subjects[idx].data = () => subjectObject;
    firebase.firestore().collection('schedules').doc(user.uid).set(scheduleObject)
      .then(() => {
        setSchedule(scheduleObject);
      });
    firebase.firestore().collection('subjects').doc(selected.id).set(subjectObject)
      .then(() => {
        setShowModal('subscribe');
        setSubjectSelected(null);
      });
  }
  const handleUnsubscribe = () => {
    let scheduleObject = schedule;
    selected.data().schedule.forEach(time => {
      scheduleObject = {
        ...scheduleObject,
        [time]: null
      };
    });
    let subjectObject = {
      ...selected.data(),
      places: selected.data().places + 1
    };
    let idx = subjects.findIndex((element) => element.id === selected.id);
    subjects[idx].data = () => subjectObject;
    firebase.firestore().collection('schedules').doc(user.uid).set(scheduleObject)
      .then(() => {
        setSchedule(scheduleObject);
        setSubjectSelected(null);
      });
    firebase.firestore().collection('subjects').doc(selected.id).set(subjectObject)
      .then(() => {
        setSubjectSelected(null);
        setShowModal('unsubscribe');
      });
  }
  return (
    <PopUp>
      <h1>{selected.data().name}</h1>
        <h3><span>Teacher: </span>{selected.data().teacher}</h3>
        <h3><span>Places: </span>{selected.data().places}</h3>
        <h3><span>Schedule: </span></h3>
        {
          selected.data().schedule.map((element, index) => {
            return <h3 key={index}>{`${element.substring(0, 3)} ${element.substring(3)} hrs`}</h3>
          })
        }
        {!schedule[selected.data().schedule[0]] && <button onClick={handleSubscribe} className="btn">Subscribe</button>}
        {schedule[selected.data().schedule[0]] && <button onClick={handleUnsubscribe} className="btn">Unsubscribe</button>}
        <button onClick={() => setSubjectSelected(null)} className="btn-inverse">Cancel</button>
        {error && <h2 className="error">{error}</h2>}
    </PopUp>
  );
};

export default PopUpResume;