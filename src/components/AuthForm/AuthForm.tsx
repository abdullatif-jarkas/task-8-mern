import { FormFieldsDataType } from "../../data/SignUpData";
import AuthQuestion from "../AuthQuestion/AuthQuestion";
import "./AuthForm.css";
import { useLocation } from "react-router-dom";
import SignInFormFields from "./FormFields/SignInFormFields";
import SignUpFormFields from "./FormFields/SignUpFormFields";

interface AuthFormProps {
  logo: string;
  title: string;
  text: string;
  data: FormFieldsDataType;
  button: string;
  questionText: string;
  questionUrl: string;
  questionUrlText: string;
  img: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  logo,
  title,
  text,
  questionText,
  questionUrl,
  questionUrlText,
}) => {
  const location = useLocation();

  return (
    <div className="auth-form">
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="auth-header-text">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      {location.pathname === "/auth/signup" ? (
        <>
          <SignUpFormFields />
          <AuthQuestion
            text={questionText}
            url={questionUrl}
            urlText={questionUrlText}
          />
        </>
      ) : (
        <>
          <SignInFormFields />
          <AuthQuestion
            text={questionText}
            url={questionUrl}
            urlText={questionUrlText}
          />
        </>
      )}
    </div>
  );
};

export default AuthForm;
