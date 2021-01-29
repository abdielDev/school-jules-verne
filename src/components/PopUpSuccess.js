import PopUp from "./PopUp";
import { HiCheckCircle } from "react-icons/hi";
import { GrClose } from "react-icons/gr";

const PopUpSuccess = ({ setShowModal, showModal }) => {
  return (
    <PopUp>
      <h1 className="success"><HiCheckCircle /></h1>
      <h1 className="success">{showModal === 'subscribe' ? 'You are signed up' : 'You are unsubscribed'}</h1>
      <button onClick={() => setShowModal(null)} className="close"><GrClose /></button>
    </PopUp>
  );
};

export default PopUpSuccess;