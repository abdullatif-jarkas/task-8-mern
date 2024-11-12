import { Link } from "react-router-dom";
import './BackButton.css'

const BackButton = () => {
  return (
    <Link to="/products" className="back-button">
      <img src="/images/arrow-left.png" alt="arrow left" />
    </Link>
  );
};

export default BackButton;
