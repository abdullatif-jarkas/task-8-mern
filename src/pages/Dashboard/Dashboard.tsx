import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Dashboard.css";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/signIn");
    }
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
