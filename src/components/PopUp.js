import '../styles/components/PopUp.scss';

const PopUp = ({ children }) => {
  return (
    <div className="PopUp">
      <div className="PopUp-container">
        {children}
      </div>
    </div>
  );
};

export default PopUp;