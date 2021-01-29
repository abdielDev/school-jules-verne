import '../styles/components/SubjectList.scss';
import { BsThreeDotsVertical } from "react-icons/bs";
import SubjectContext from '../context/SubjectContext';
import { useContext, useState } from 'react';
import PopUpResume from './PopUpResume';
import PopUpSuccess from './PopUpSuccess';
import UserContext from '../context/UserContext';

const SubjectList = () => {

  const [subjectSelected, setSubjectSelected] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const { subjects } = useContext(SubjectContext);
  const { schedule } = useContext(UserContext);
  const handleOpenModal = (index) => {
    setSubjectSelected(subjects[index]);
  };
  return (
    <div className="SubjectList">
      {
        subjectSelected ? <PopUpResume selected={subjectSelected} setSubjectSelected={setSubjectSelected} setShowModal={setShowModal} /> : <></>
      }
      {showModal && <PopUpSuccess setShowModal={setShowModal} showModal={showModal} />}
      <div className="wrapped">
        <table>
          <thead>
            <tr>
              <th>Folio</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Status</th>
              <th>Schedule</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <SubjectContext.Consumer>
              {
                (context) => {
                  return schedule && context.subjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject.data().folio}</td>
                      <td>{subject.data().name}</td>
                      <td>{subject.data().teacher}</td>
                      <td>{schedule[subject.data().schedule[0]] ? 'Signed up' : 'Free'}</td>
                      <td>
                        {subject.data().schedule.map((time, index) => (
                          <span key={index}>{`${time.substring(0, 3)}${index !== subject.data().schedule.length - 1 ? ',' : ''} `}</span>
                        ))}
                      </td>
                      <td>
                        <BsThreeDotsVertical />
                        <div className="options">
                          <button onClick={() => handleOpenModal(index)} >View detail</button>
                          <button>Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))
                }
              }
            </SubjectContext.Consumer>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectList;