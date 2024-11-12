import axios from "axios";
import AuthButton from "../../AuthButton/AuthButton";
import "./FormFields.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpFormFields: React.FC = () => {
  const [TheFirstName, setTheFirstName] = useState<string>("");
  const [TheLastName, setTheLastName] = useState<string>("");
  const [Email, setEmail] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [ConfirmPassword, setConfirmPassword] = useState<string>("");
  const [Image, setImage] = useState<File | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | undefined>("");
  const navigate = useNavigate();

  function signUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.append("first_name", TheFirstName);
    formData.append("last_name", TheLastName);
    const userName = `${TheFirstName} ${TheLastName}`;
    formData.append("user_name", userName);
    formData.append("email", Email);
    formData.append("password", Password);
    formData.append("password_confirmation", Password);
    if (Image) {
      formData.append("profile_image", Image);
    }

    axios
      .post("https://test1.focal-x.com/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const userData = res.data?.data;

        if (userData && userData.user && userData.token) {
          localStorage.setItem("token", `Bearer ${userData.token}`);
          localStorage.setItem("image", userData.user?.profile_image_url || "");
          localStorage.setItem("username", userData.user?.user_name || "");
          navigate("/products");
        } else {
          setErrorMessage("Invalid user data received from the server.");
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage(
            "An error occurred during registration, please try again."
          );
        }
      });
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <form className="signin-form-fields" onSubmit={(e) => signUp(e)}>
      <div>
        <h3 className="field-title">Name</h3>
        <div className="field-inputs">
          <input
            type="text"
            placeholder="First Name"
            onChange={(e) => setTheFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={(e) => setTheLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h3 className="field-title">Email</h3>
        <div className="field-inputs">
          <input
            type="text"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h3 className="field-title">Password</h3>
        <div className="field-inputs">
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Re-enter your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="profile-img">
        <h3 className="field-title">Profile Image</h3>
        <div className="img-input-container">
          {imagePreview && (
            <img src={imagePreview} alt="product" width="98px" />
          )}
          <input type="file" onChange={(e) => handleImageChange(e)} />
        </div>
      </div>
      <AuthButton title="SIGN UP" />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default SignUpFormFields;
