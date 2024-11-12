import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useRef } from "react";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/signin");
  };

  const userName = localStorage.getItem("username") || "Guest";
  const userImage = localStorage.getItem("image") || "/images/default-avatar.png";

  const handleClick = () => {
    if (ref.current) {
      ref.current.classList.toggle("active");
    }
  };

  return (
    <aside ref={ref}>
      <div className="logo-container">
        <img src="/images/Logo.png" alt="logo" />
      </div>
      <div className="avatar-container">
        <img src={userImage} alt="user" />
      </div>
      <h2 className="username">{userName}</h2>
      <div className="links">
        <NavLink to="/products">
          <img src="/images/products-vector.png" alt="products" />
          Products
        </NavLink>
        <NavLink to="/favorites">
          <img src="/images/vector.png" alt="favorites" />
          Favorites
        </NavLink>
        <NavLink to="/order-list">
          <img src="/images/vector.png" alt="order list" />
          Order List
        </NavLink>
      </div>
      <div className="logout">
        <div onClick={handleLogout}>
          Logout <img src="/images/logout-vector.png" alt="logout" />
        </div>
      </div>
      <button className="active-btn" onClick={handleClick}>
        =
      </button>
    </aside>
  );
};

export default Sidebar;
