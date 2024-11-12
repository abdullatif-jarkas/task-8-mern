import { Link } from "react-router-dom";
import './AddButton.css'

const AddButton = () => {
  return (
    <div className="add-btn">
      <Link to="/products/add">ADD NEW PRODUCT</Link>
    </div>
  );
};

export default AddButton;