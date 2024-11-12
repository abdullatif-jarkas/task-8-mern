import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthButton from "../../AuthButton/AuthButton";
import Loader from "../../Loader/Loader";
import { fetchItems, login } from "../../../redux/slice/authSlice";
import { RootState } from "../../../redux/store";
import './FormFields.css'

const SignInFormFields: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(email, password))
      .then(() => {
        dispatch(fetchItems());
        navigate("/products");
      })
      .catch((error: Error) => console.error("Login failed:", error));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form className="signin-form-fields" onSubmit={handleSubmit}>
          <div>
            <h3 className="field-title">Email</h3>
            <div className="field-inputs">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h3 className="field-title">Password</h3>
            <div className="field-inputs">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <AuthButton title="SIGN IN" />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}
    </>
  );
};

export default SignInFormFields;
